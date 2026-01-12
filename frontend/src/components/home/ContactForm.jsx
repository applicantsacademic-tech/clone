import React, { useState } from 'react';
import { Mail, Clock, MapPin, Send } from 'lucide-react';
import { puppies } from '../../data/mockData';

const ContactForm = ({ isStandalone = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    puppy: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will get back to you within 24 hours.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      puppy: '',
      message: ''
    });
  };

  const puppyOptions = [
    ...puppies.map(p => ({ value: p.name.toLowerCase(), label: `${p.name} - ${p.sex}` })),
    { value: 'general', label: 'General Inquiry / Not Sure Yet' }
  ];

  return (
    <section className={`py-16 lg:py-20 ${isStandalone ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        {!isStandalone && (
          <div className="text-center mb-12">
            <div className="inline-block bg-[#1B5E20] text-white text-sm px-4 py-2 rounded-full mb-4">
              Get In Touch
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Find Your Perfect Puppy?
            </h2>
            <p className="text-gray-600">
              Have questions or ready to welcome a new furry family member? We'd love to hear from you!
            </p>
          </div>
        )}

        {isStandalone && (
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-600">
              Have questions or ready to welcome a new furry family member? We'd love to hear from you!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Puppy Inquiry Form</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Puppy Inquiry</label>
                  <p className="text-sm text-gray-500 mb-2">
                    <strong>Available Puppies:</strong> {puppies.map(p => p.name).join(', ')}
                  </p>
                  <select
                    name="puppy"
                    value={formData.puppy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all bg-white"
                    required
                  >
                    <option value="">Select a puppy</option>
                    {puppyOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about yourself and what you're looking for in a puppy..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B5E20] hover:bg-[#145214] text-white py-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#1B5E20]" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                  </div>
                  <a href="mailto:info@santaslittlewieners.com" className="text-[#1B5E20] hover:underline ml-13">
                    info@santaslittlewieners.com
                  </a>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#1B5E20]" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Response Time</h4>
                  </div>
                  <p className="text-gray-600 ml-13">
                    We typically respond within<br />
                    <span className="font-semibold text-gray-900">24 hours or less</span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#1B5E20]" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Our Location</h4>
                  </div>
                  <p className="text-gray-600 text-sm ml-13">
                    We operate as a family-based home breeder, so for the safety and privacy of our 
                    family and puppies, we do not publicly list our address. Once you contact us, 
                    we'll gladly share our exact location and arrange a convenient visit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;