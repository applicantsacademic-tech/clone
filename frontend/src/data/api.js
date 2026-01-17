// API Configuration for PHP Backend
// This file configures the frontend to work with your PHP backend on shared hosting

// Automatically detect the API URL based on current location
const getApiUrl = () => {
  // If running locally, use localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost/api';
  }
  // Otherwise, use the same domain
  return `${window.location.origin}/api`;
};

export const API_URL = getApiUrl();

// API Endpoints
export const API_ENDPOINTS = {
  puppies: `${API_URL}/puppies.php`,
  testimonials: `${API_URL}/testimonials.php`,
  contact: `${API_URL}/contact.php`,
};

// Fetch puppies from API
export const fetchPuppies = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.puppies);
    if (!response.ok) throw new Error('Failed to fetch puppies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching puppies:', error);
    // Return mock data as fallback
    const { puppies } = await import('./mockData');
    return puppies;
  }
};

// Fetch testimonials from API
export const fetchTestimonials = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.testimonials);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    // Return mock data as fallback
    const { testimonials } = await import('./mockData');
    return testimonials;
  }
};

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(API_ENDPOINTS.contact, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};
