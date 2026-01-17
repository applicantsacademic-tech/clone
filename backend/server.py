from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import secrets

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'santa_wieners')]

# Create the main app
app = FastAPI(title="Santa's Little Wieners API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Basic Auth for Admin
security = HTTPBasic()

# Admin credentials (in production, use environment variables)
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'santapuppies2025')

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# ==================== MODELS ====================

class Puppy(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    sex: str
    age: str
    price: float
    originalPrice: float
    status: str = "Available"
    rating: float = 5.0
    image: str
    description: str
    coat: str
    features: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PuppyCreate(BaseModel):
    name: str
    sex: str
    age: str
    price: float
    originalPrice: float
    status: str = "Available"
    rating: float = 5.0
    image: str
    description: str
    coat: str
    features: List[str] = []

class PuppyUpdate(BaseModel):
    name: Optional[str] = None
    sex: Optional[str] = None
    age: Optional[str] = None
    price: Optional[float] = None
    originalPrice: Optional[float] = None
    status: Optional[str] = None
    rating: Optional[float] = None
    image: Optional[str] = None
    description: Optional[str] = None
    coat: Optional[str] = None
    features: Optional[List[str]] = None

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    initials: str
    location: str
    rating: int = 5
    timeAgo: str
    review: str
    puppyName: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    location: str
    rating: int = 5
    review: str
    puppyName: str

class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    firstName: str
    lastName: str
    email: str
    phone: str
    address: str = ""
    puppy: str
    message: str
    status: str = "new"  # new, read, replied
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactInquiryCreate(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    address: str = ""
    puppy: str
    message: str

class SiteSettings(BaseModel):
    id: str = "site_settings"
    siteName: str = "Santa's Little Wieners"
    email: str = "info@santaslittlewieners.com"
    phone: str = ""
    bannerText: str = "Get Your Little Joy for Christmas"
    aboutText: str = ""
    holidayMessage: str = ""
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# ==================== PUBLIC ENDPOINTS ====================

@api_router.get("/")
async def root():
    return {"message": "Santa's Little Wieners API"}

@api_router.get("/puppies", response_model=List[Puppy])
async def get_puppies():
    puppies = await db.puppies.find().sort("created_at", -1).to_list(100)
    return [Puppy(**p) for p in puppies]

@api_router.get("/puppies/{puppy_id}", response_model=Puppy)
async def get_puppy(puppy_id: str):
    puppy = await db.puppies.find_one({"id": puppy_id})
    if not puppy:
        raise HTTPException(status_code=404, detail="Puppy not found")
    return Puppy(**puppy)

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find().sort("created_at", -1).to_list(100)
    return [Testimonial(**t) for t in testimonials]

@api_router.post("/contact")
async def submit_contact(inquiry: ContactInquiryCreate):
    inquiry_dict = inquiry.dict()
    inquiry_obj = ContactInquiry(**inquiry_dict)
    await db.inquiries.insert_one(inquiry_obj.dict())
    return {"message": "Thank you for your inquiry! We will get back to you within 24 hours.", "id": inquiry_obj.id}

@api_router.get("/settings")
async def get_settings():
    settings = await db.settings.find_one({"id": "site_settings"})
    if not settings:
        return SiteSettings()
    return SiteSettings(**settings)

# ==================== ADMIN ENDPOINTS ====================

# Admin Auth Check
@api_router.get("/admin/verify")
async def verify_admin_access(username: str = Depends(verify_admin)):
    return {"message": "Authenticated", "username": username}

# Puppies Admin
@api_router.post("/admin/puppies", response_model=Puppy)
async def create_puppy(puppy: PuppyCreate, username: str = Depends(verify_admin)):
    puppy_dict = puppy.dict()
    puppy_obj = Puppy(**puppy_dict)
    await db.puppies.insert_one(puppy_obj.dict())
    return puppy_obj

@api_router.put("/admin/puppies/{puppy_id}", response_model=Puppy)
async def update_puppy(puppy_id: str, puppy_update: PuppyUpdate, username: str = Depends(verify_admin)):
    existing = await db.puppies.find_one({"id": puppy_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Puppy not found")
    
    update_data = {k: v for k, v in puppy_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.puppies.update_one({"id": puppy_id}, {"$set": update_data})
    updated = await db.puppies.find_one({"id": puppy_id})
    return Puppy(**updated)

@api_router.delete("/admin/puppies/{puppy_id}")
async def delete_puppy(puppy_id: str, username: str = Depends(verify_admin)):
    result = await db.puppies.delete_one({"id": puppy_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Puppy not found")
    return {"message": "Puppy deleted successfully"}

# Testimonials Admin
@api_router.post("/admin/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate, username: str = Depends(verify_admin)):
    testimonial_dict = testimonial.dict()
    # Generate initials from name
    name_parts = testimonial_dict["name"].split()
    initials = "".join([part[0].upper() for part in name_parts[:2]])
    testimonial_dict["initials"] = initials
    testimonial_dict["timeAgo"] = "Just now"
    
    testimonial_obj = Testimonial(**testimonial_dict)
    await db.testimonials.insert_one(testimonial_obj.dict())
    return testimonial_obj

@api_router.delete("/admin/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, username: str = Depends(verify_admin)):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# Inquiries Admin
@api_router.get("/admin/inquiries", response_model=List[ContactInquiry])
async def get_inquiries(username: str = Depends(verify_admin)):
    inquiries = await db.inquiries.find().sort("created_at", -1).to_list(100)
    return [ContactInquiry(**i) for i in inquiries]

@api_router.put("/admin/inquiries/{inquiry_id}/status")
async def update_inquiry_status(inquiry_id: str, status: str, username: str = Depends(verify_admin)):
    result = await db.inquiries.update_one({"id": inquiry_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"message": "Status updated successfully"}

@api_router.delete("/admin/inquiries/{inquiry_id}")
async def delete_inquiry(inquiry_id: str, username: str = Depends(verify_admin)):
    result = await db.inquiries.delete_one({"id": inquiry_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"message": "Inquiry deleted successfully"}

# Settings Admin
@api_router.put("/admin/settings")
async def update_settings(settings: SiteSettings, username: str = Depends(verify_admin)):
    settings_dict = settings.dict()
    settings_dict["updated_at"] = datetime.utcnow()
    await db.settings.update_one(
        {"id": "site_settings"}, 
        {"$set": settings_dict}, 
        upsert=True
    )
    return {"message": "Settings updated successfully"}

# Seed initial data
@api_router.post("/admin/seed")
async def seed_data(username: str = Depends(verify_admin)):
    # Check if data already exists
    puppy_count = await db.puppies.count_documents({})
    if puppy_count > 0:
        return {"message": "Data already seeded", "puppies": puppy_count}
    
    # Seed puppies
    puppies_data = [
        {
            "name": "Charlie", "sex": "Male", "age": "10 Weeks", "price": 750, "originalPrice": 850,
            "status": "Available", "rating": 5.0,
            "image": "https://santaslittlewieners.com/images/Charlie%20new.jpeg",
            "description": "Charlie is a playful and spirited Dachshund puppy with a heart of gold.",
            "coat": "Light chocolate/cream dapple puppy with a pale (pinkish) nose and soft, feathery ears.",
            "features": ["Lifetime health guarantee", "Potty and crate trained", "Up to date vaccinations", "Up to date de-worming", "Starter Kit included"]
        },
        {
            "name": "Bianca", "sex": "Female", "age": "10 Weeks", "price": 750, "originalPrice": 850,
            "status": "Available", "rating": 5.0,
            "image": "https://santaslittlewieners.com/images/Bianca%20new.jpeg",
            "description": "Bianca is a beautiful and affectionate Dachshund puppy with a sweet, loving personality.",
            "coat": "Chocolate dapple puppy with lighter cream/gray marbling and tan points.",
            "features": ["Lifetime health guarantee", "Potty and crate trained", "Up to date vaccinations", "Up to date de-worming", "Starter Kit included"]
        },
        {
            "name": "Doris", "sex": "Female", "age": "10 Weeks", "price": 750, "originalPrice": 850,
            "status": "Available", "rating": 5.0,
            "image": "https://santaslittlewieners.com/images/Doris%20new.jpeg",
            "description": "Doris is an adorable chocolate dapple Dachshund with the sweetest personality.",
            "coat": "Chocolate dapple puppy with tan points on the face and legs.",
            "features": ["Lifetime health guarantee", "Potty and crate trained", "Up to date vaccinations", "Up to date de-worming", "Starter Kit included"]
        },
        {
            "name": "Lola", "sex": "Female", "age": "10 Weeks", "price": 750, "originalPrice": 850,
            "status": "Available", "rating": 5.0,
            "image": "https://santaslittlewieners.com/images/Lola%20new.jpeg",
            "description": "Lola is a striking dark dapple beauty with an enchanting personality.",
            "coat": "Dark dapple puppy (black/gray marbling) with tan points and a lighter chest.",
            "features": ["Lifetime health guarantee", "Potty and crate trained", "Up to date vaccinations", "Up to date de-worming", "Starter Kit included"]
        },
        {
            "name": "Chester", "sex": "Male", "age": "10 Weeks", "price": 750, "originalPrice": 850,
            "status": "Available", "rating": 5.0,
            "image": "https://santaslittlewieners.com/images/Chester%20new.jpeg",
            "description": "Chester is a confident little gentleman with a curious spirit and a heart full of love.",
            "coat": "Silver/gray dapple puppy with black patches and tan points on the face and legs.",
            "features": ["Lifetime health guarantee", "Potty and crate trained", "Up to date vaccinations", "Up to date de-worming", "Starter Kit included"]
        }
    ]
    
    for p in puppies_data:
        puppy = Puppy(**p)
        await db.puppies.insert_one(puppy.dict())
    
    # Seed testimonials
    testimonials_data = [
        {"name": "Jennifer Martinez", "location": "Austin, Texas", "rating": 5, "review": "We absolutely love our little dachshund Bella from Santa's Little Wieners! She came to us healthy, well-socialized, and full of personality.", "puppyName": "Bella"},
        {"name": "Robert Williams", "location": "Denver, Colorado", "rating": 5, "review": "Best decision we ever made! Our mini dachshund Duke has brought so much joy to our family.", "puppyName": "Duke"},
        {"name": "Sarah Kim", "location": "Seattle, Washington", "rating": 5, "review": "Cooper, our chocolate dapple, is the sweetest puppy! He was already potty trained and knew basic commands.", "puppyName": "Cooper"}
    ]
    
    for t in testimonials_data:
        name_parts = t["name"].split()
        t["initials"] = "".join([part[0].upper() for part in name_parts[:2]])
        t["timeAgo"] = "Recently"
        testimonial = Testimonial(**t)
        await db.testimonials.insert_one(testimonial.dict())
    
    return {"message": "Data seeded successfully", "puppies": len(puppies_data), "testimonials": len(testimonials_data)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
