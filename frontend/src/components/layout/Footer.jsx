import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { navLinks, usefulInfoLinks } from '../../data/mockData';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer className="bg-[#1B5E20] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div>
            <div className="mb-4">
              <span className="text-white font-serif text-2xl font-bold italic">Santas Little</span>
              <br />
              <span className="text-[#FFD54F] font-serif text-2xl font-bold italic">Wieners</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Bringing joy to families one puppy at a time. We specialize in raising healthy, 
              happy Dachshund puppies in a loving home environment. Your perfect furry companion awaits!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#C62828] -mb-2"></span>
            </h3>
            <ul className="space-y-2 mt-6">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Puppy Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              Puppy Info
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#C62828] -mb-2"></span>
            </h3>
            <ul className="space-y-2 mt-6">
              {usefulInfoLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#C62828] -mb-2"></span>
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#C62828] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a href="mailto:info@santaslittlewieners.com" className="text-gray-300 hover:text-white text-sm">
                  info@santaslittlewieners.com
                </a>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 mt-6">
                <p className="text-sm mb-3">Subscribe for puppy updates and holiday specials!</p>
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-white/40"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C62828] hover:bg-[#B71C1C] rounded-r-lg text-sm font-medium transition-colors"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-400">
            © 2025 <span className="text-white">Santa's Little Wieners</span>. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <Link to="/sales-agreement" className="text-gray-400 hover:text-white transition-colors">
              Sales Agreement
            </Link>
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;