-- ===========================================
-- Santa's Little Wieners Database Schema
-- ===========================================
-- Run this SQL in your cPanel phpMyAdmin
-- ===========================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS santa_wieners;
USE santa_wieners;

-- ===========================================
-- Puppies Table
-- ===========================================
CREATE TABLE IF NOT EXISTS puppies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sex ENUM('Male', 'Female') NOT NULL,
    age VARCHAR(50) DEFAULT '10 Weeks',
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    status ENUM('Available', 'Sold', 'Reserved') DEFAULT 'Available',
    rating DECIMAL(2,1) DEFAULT 5.0,
    image VARCHAR(500) NOT NULL,
    description TEXT,
    coat TEXT,
    features TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===========================================
-- Testimonials Table
-- ===========================================
CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    initials VARCHAR(10),
    location VARCHAR(100),
    rating INT DEFAULT 5,
    review TEXT NOT NULL,
    puppy_name VARCHAR(100),
    time_ago VARCHAR(50) DEFAULT 'Recently',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- Contact Inquiries Table
-- ===========================================
CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    puppy VARCHAR(100),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- Site Settings Table
-- ===========================================
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===========================================
-- Insert Default Settings
-- ===========================================
INSERT INTO settings (setting_key, setting_value) VALUES
('site_name', 'Santa''s Little Wieners'),
('email', 'info@santaslittlewieners.com'),
('phone', ''),
('banner_text', 'Get Your Little Joy for Christmas'),
('about_text', 'Welcome to Santa''s Little Wieners, where we specialize in raising healthy, happy, and well-socialized Dachshund puppies.')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- ===========================================
-- Insert Sample Puppies Data
-- ===========================================
INSERT INTO puppies (name, sex, age, price, original_price, status, rating, image, description, coat, features) VALUES
('Charlie', 'Male', '10 Weeks', 750.00, 850.00, 'Available', 5.0, 
 'https://santaslittlewieners.com/images/Charlie%20new.jpeg',
 'Charlie is a playful and spirited Dachshund puppy with a heart of gold. His stunning light chocolate and cream dapple coat with beautiful markings and pale pinkish nose makes him truly stand out.',
 'Light chocolate/cream dapple puppy with a pale (pinkish) nose and soft, feathery ears. Silky medium-length coat with tan/cream markings.',
 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included'),

('Bianca', 'Female', '10 Weeks', 750.00, 850.00, 'Available', 5.0,
 'https://santaslittlewieners.com/images/Bianca%20new.jpeg',
 'Bianca is a beautiful and affectionate Dachshund puppy with a sweet, loving personality. Her gorgeous chocolate dapple coat with cream and gray marbling is absolutely stunning.',
 'Chocolate dapple puppy with lighter cream/gray marbling and tan points. Long, feathery ears with a soft medium-to-long coat.',
 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included'),

('Doris', 'Female', '10 Weeks', 750.00, 850.00, 'Available', 5.0,
 'https://santaslittlewieners.com/images/Doris%20new.jpeg',
 'Doris is an adorable chocolate dapple Dachshund with the sweetest personality. Her smooth short coat is easy to maintain and her compact size makes her perfect for cuddling.',
 'Chocolate dapple puppy with tan points on the face and legs. Smooth, short coat with a long body and floppy ears.',
 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included'),

('Lola', 'Female', '10 Weeks', 750.00, 850.00, 'Available', 5.0,
 'https://santaslittlewieners.com/images/Lola%20new.jpeg',
 'Lola is a striking dark dapple beauty with an enchanting personality. Her luxurious longer wavy coat with black and gray marbling and tan accents is absolutely breathtaking.',
 'Dark dapple puppy (black/gray marbling) with tan points and a lighter chest. Longer, wavy coat with feathery ears.',
 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included'),

('Chester', 'Male', '10 Weeks', 750.00, 850.00, 'Available', 5.0,
 'https://santaslittlewieners.com/images/Chester%20new.jpeg',
 'Chester is a confident little gentleman with a curious spirit and a heart full of love. His charming silver and gray dapple markings with black patches make him irresistible.',
 'Silver/gray dapple puppy with black patches and tan points on the face and legs. Smooth, short coat with black floppy ears.',
 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included'),

('Darcy', 'Female', '10 Weeks', 750.00, 850.00, 'Available', 5.0,
 'https://santaslittlewieners.com/images/darcy-f.jpg',
 'Darcy is a graceful and affectionate Dachshund puppy with a calm, loving personality. Her elegant cream and silver dapple coat is truly unique.',
 'Cream/silver dapple puppy with tan points on the face and paws. Floppy ears and a soft medium-length coat.',
 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included'),

('Max', 'Male', '10 Weeks', 750.00, 850.00, 'Available', 5.0,
 'https://santaslittlewieners.com/images/max%20new.jpeg',
 'Max is a gorgeous light cream Dachshund with feathery ears and a darker nose. His soft fluffy medium-length coat and sweet face will melt your heart.',
 'Light cream puppy with a soft, fluffy medium-length coat and feathery ears. Cream face and legs with a darker nose.',
 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included'),

('Chloe', 'Female', '10 Weeks', 750.00, 850.00, 'Available', 5.0,
 'https://santaslittlewieners.com/images/chloe-f.jpg',
 'Chloe is a stunning cream blonde beauty with the softest fluffy coat. Her sweet temperament and love for cuddles make her an ideal companion.',
 'Cream/blonde puppy with a lighter chest and floppy ears. Soft, silky short-to-medium coat and big dark eyes.',
 'Lifetime health guarantee|Potty and crate trained|Up to date vaccinations|Up to date de-worming|Starter Kit included');

-- ===========================================
-- Insert Sample Testimonials
-- ===========================================
INSERT INTO testimonials (name, initials, location, rating, review, puppy_name, time_ago) VALUES
('Jennifer Martinez', 'JM', 'Austin, Texas', 5, 'We absolutely love our little dachshund Bella from Santa''s Little Wieners! She came to us healthy, well-socialized, and full of personality. The team was so helpful throughout the entire process.', 'Bella', '2 weeks ago'),
('Robert Williams', 'RW', 'Denver, Colorado', 5, 'Best decision we ever made! Our mini dachshund Duke has brought so much joy to our family. Santa''s Little Wieners provided excellent care and the health guarantee gave us peace of mind.', 'Duke', '1 month ago'),
('Sarah Kim', 'SK', 'Seattle, Washington', 5, 'Cooper, our chocolate dapple, is the sweetest puppy! He was already potty trained and knew basic commands. You can tell these puppies are raised with love and attention.', 'Cooper', '3 weeks ago'),
('Michael Thompson', 'MT', 'Chicago, Illinois', 5, 'From the first phone call to bringing Rosie home, the experience was fantastic. They answered all our questions and even followed up to check on her. Highly recommend!', 'Rosie', '1 month ago'),
('Amanda Lee', 'AL', 'Miami, Florida', 5, 'Our long-haired dachshund Teddy is everything we hoped for and more. Beautiful coat, wonderful temperament, and so smart! Santa''s Little Wieners truly cares about their puppies.', 'Teddy', '2 months ago');
