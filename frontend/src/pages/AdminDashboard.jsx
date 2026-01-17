import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dog, 
  MessageSquare, 
  Star, 
  Settings, 
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Save,
  Database
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Auth helper
const getAuthHeaders = () => {
  const credentials = localStorage.getItem('adminCredentials');
  if (!credentials) return {};
  return {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json'
  };
};

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [puppies, setPuppies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ puppies: 0, testimonials: 0, inquiries: 0, newInquiries: 0 });
  
  // Modal states
  const [showPuppyModal, setShowPuppyModal] = useState(false);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingPuppy, setEditingPuppy] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const navigate = useNavigate();

  // Check authentication on load
  useEffect(() => {
    const credentials = localStorage.getItem('adminCredentials');
    if (credentials) {
      verifyAuth();
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const verifyAuth = async () => {
    try {
      const response = await fetch(`${API}/admin/verify`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminCredentials');
      }
    } catch (err) {
      localStorage.removeItem('adminCredentials');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch(`${API}/admin/verify`, {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
      
      if (response.ok) {
        localStorage.setItem('adminCredentials', credentials);
        setIsAuthenticated(true);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminCredentials');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const fetchAllData = async () => {
    try {
      const [puppiesRes, testimonialsRes, inquiriesRes] = await Promise.all([
        fetch(`${API}/puppies`),
        fetch(`${API}/testimonials`),
        fetch(`${API}/admin/inquiries`, { headers: getAuthHeaders() })
      ]);
      
      const puppiesData = await puppiesRes.json();
      const testimonialsData = await testimonialsRes.json();
      const inquiriesData = inquiriesRes.ok ? await inquiriesRes.json() : [];
      
      setPuppies(puppiesData);
      setTestimonials(testimonialsData);
      setInquiries(inquiriesData);
      
      setStats({
        puppies: puppiesData.length,
        testimonials: testimonialsData.length,
        inquiries: inquiriesData.length,
        newInquiries: inquiriesData.filter(i => i.status === 'new').length
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const seedData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/admin/seed`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      const data = await response.json();
      alert(data.message);
      fetchAllData();
    } catch (err) {
      alert('Error seeding data');
    } finally {
      setLoading(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
              <Dog className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Santa's Little Wieners</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B5E20] hover:bg-[#145214] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-[#1B5E20] hover:underline text-sm"
            >
              ← Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Content
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B5E20] text-white min-h-screen fixed left-0 top-0">
        <div className="p-6">
          <h1 className="text-xl font-bold">Santa's Little</h1>
          <p className="text-green-200 text-sm">Wieners Admin</p>
        </div>
        
        <nav className="mt-6">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'puppies', icon: Dog, label: 'Puppies' },
            { id: 'testimonials', icon: Star, label: 'Testimonials' },
            { id: 'inquiries', icon: MessageSquare, label: 'Inquiries', badge: stats.newInquiries },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                activeTab === item.id ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Puppies</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.puppies}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                    <Dog className="w-6 h-6 text-[#1B5E20]" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Testimonials</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.testimonials}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Inquiries</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.inquiries}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">New Inquiries</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.newInquiries}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => { setActiveTab('puppies'); setShowPuppyModal(true); }}
                  className="flex items-center px-4 py-2 bg-[#1B5E20] text-white rounded-lg hover:bg-[#145214] transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Puppy
                </button>
                <button
                  onClick={() => { setActiveTab('testimonials'); setShowTestimonialModal(true); }}
                  className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Website
                </button>
                <button
                  onClick={seedData}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                >
                  <Database className="w-4 h-4 mr-2" />
                  {loading ? 'Seeding...' : 'Seed Sample Data'}
                </button>
              </div>
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
              {inquiries.length === 0 ? (
                <p className="text-gray-500">No inquiries yet</p>
              ) : (
                <div className="space-y-4">
                  {inquiries.slice(0, 5).map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{inquiry.firstName} {inquiry.lastName}</p>
                        <p className="text-sm text-gray-500">Interested in: {inquiry.puppy}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        inquiry.status === 'new' ? 'bg-red-100 text-red-600' :
                        inquiry.status === 'read' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Puppies Tab */}
        {activeTab === 'puppies' && (
          <PuppiesManager 
            puppies={puppies} 
            onRefresh={fetchAllData}
            showModal={showPuppyModal}
            setShowModal={setShowPuppyModal}
            editingPuppy={editingPuppy}
            setEditingPuppy={setEditingPuppy}
          />
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <TestimonialsManager 
            testimonials={testimonials} 
            onRefresh={fetchAllData}
            showModal={showTestimonialModal}
            setShowModal={setShowTestimonialModal}
          />
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <InquiriesManager inquiries={inquiries} onRefresh={fetchAllData} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SettingsManager />
        )}
      </main>
    </div>
  );
};

// Puppies Manager Component
const PuppiesManager = ({ puppies, onRefresh, showModal, setShowModal, editingPuppy, setEditingPuppy }) => {
  const [formData, setFormData] = useState({
    name: '', sex: 'Male', age: '10 Weeks', price: 750, originalPrice: 850,
    status: 'Available', rating: 5.0, image: '', description: '', coat: '',
    features: ['Lifetime health guarantee', 'Potty and crate trained', 'Up to date vaccinations', 'Up to date de-worming', 'Starter Kit included']
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPuppy) {
      setFormData(editingPuppy);
      setShowModal(true);
    }
  }, [editingPuppy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = editingPuppy 
        ? `${API}/admin/puppies/${editingPuppy.id}`
        : `${API}/admin/puppies`;
      const method = editingPuppy ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });
      
      setShowModal(false);
      setEditingPuppy(null);
      setFormData({
        name: '', sex: 'Male', age: '10 Weeks', price: 750, originalPrice: 850,
        status: 'Available', rating: 5.0, image: '', description: '', coat: '',
        features: ['Lifetime health guarantee', 'Potty and crate trained', 'Up to date vaccinations', 'Up to date de-worming', 'Starter Kit included']
      });
      onRefresh();
    } catch (err) {
      alert('Error saving puppy');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this puppy?')) return;
    
    try {
      await fetch(`${API}/admin/puppies/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      onRefresh();
    } catch (err) {
      alert('Error deleting puppy');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Puppies</h2>
        <button
          onClick={() => { setEditingPuppy(null); setShowModal(true); }}
          className="flex items-center px-4 py-2 bg-[#1B5E20] text-white rounded-lg hover:bg-[#145214] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Puppy
        </button>
      </div>

      {/* Puppies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puppies.map((puppy) => (
          <div key={puppy.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src={puppy.image} alt={puppy.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg text-gray-900">{puppy.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  puppy.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {puppy.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{puppy.sex} • {puppy.age}</p>
              <p className="text-[#1B5E20] font-bold text-lg mt-2">${puppy.price}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditingPuppy(puppy)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(puppy.id)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">{editingPuppy ? 'Edit Puppy' : 'Add New Puppy'}</h3>
              <button onClick={() => { setShowModal(false); setEditingPuppy(null); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                  <select
                    value={formData.sex}
                    onChange={(e) => setFormData({...formData, sex: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    <option>Available</option>
                    <option>Sold</option>
                    <option>Reserved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="https://example.com/puppy.jpg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coat Description</label>
                <textarea
                  value={formData.coat}
                  onChange={(e) => setFormData({...formData, coat: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingPuppy(null); }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-2 bg-[#1B5E20] text-white rounded-lg hover:bg-[#145214] disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Puppy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Testimonials Manager Component
const TestimonialsManager = ({ testimonials, onRefresh, showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    name: '', location: '', rating: 5, review: '', puppyName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch(`${API}/admin/testimonials`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });
      
      setShowModal(false);
      setFormData({ name: '', location: '', rating: 5, review: '', puppyName: '' });
      onRefresh();
    } catch (err) {
      alert('Error saving testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await fetch(`${API}/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      onRefresh();
    } catch (err) {
      alert('Error deleting testimonial');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Testimonials</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.initials}
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <p className="text-gray-600 mt-3 text-sm">{testimonial.review}</p>
            <p className="text-xs text-gray-400 mt-2">Adopted: {testimonial.puppyName}</p>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Add Testimonial</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Austin, Texas"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Puppy Name</label>
                <input
                  type="text"
                  value={formData.puppyName}
                  onChange={(e) => setFormData({...formData, puppyName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Bella"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Inquiries Manager Component
const InquiriesManager = ({ inquiries, onRefresh }) => {
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/admin/inquiries/${id}/status?status=${status}`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      onRefresh();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await fetch(`${API}/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      onRefresh();
    } catch (err) {
      alert('Error deleting inquiry');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Inquiries</h2>
      
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {inquiry.firstName} {inquiry.lastName}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center"><Mail className="w-4 h-4 mr-1" />{inquiry.email}</span>
                    <span className="flex items-center"><Phone className="w-4 h-4 mr-1" />{inquiry.phone}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${
                  inquiry.status === 'new' ? 'bg-red-100 text-red-600' :
                  inquiry.status === 'read' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {inquiry.status}
                </span>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2"><strong>Interested in:</strong> {inquiry.puppy}</p>
                <p className="text-gray-700">{inquiry.message}</p>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => updateStatus(inquiry.id, 'read')}
                  className="px-3 py-1 text-sm bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100"
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => updateStatus(inquiry.id, 'replied')}
                  className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Settings Manager Component
const SettingsManager = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h2>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-600 mb-4">Admin credentials:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> santapuppies2025</p>
          <p className="text-sm text-gray-500 mt-2">Change these in the backend .env file for security</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
