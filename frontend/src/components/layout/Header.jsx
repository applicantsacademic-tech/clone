import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks, usefulInfoLinks } from '../../data/mockData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="bg-[#1B5E20] text-white py-2 px-4 text-center text-sm">
        <span>Get Your Little Joy for Christmas</span>
        <Link 
          to="/available-puppies" 
          className="ml-4 inline-block bg-white text-[#1B5E20] px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          Available Puppies
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm py-4 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex flex-col">
              <span className="text-[#1B5E20] font-serif text-2xl lg:text-3xl font-bold italic">Santas Little</span>
              <span className="text-[#C62828] font-serif text-2xl lg:text-3xl font-bold italic -mt-1">Wieners</span>
            </div>
            <img 
              src="https://santaslittlewieners.com/images/logo-dog.png" 
              alt="Dachshund with Santa hat" 
              className="h-12 w-auto ml-2"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.slice(0, 6).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#1B5E20]'
                    : 'text-gray-700 hover:text-[#1B5E20]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Useful Info Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="flex items-center text-sm font-medium uppercase tracking-wide text-gray-700 hover:text-[#1B5E20] transition-colors"
              >
                Useful Info
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {usefulInfoLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1B5E20]"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#1B5E20]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="pt-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium uppercase ${
                    location.pathname === link.path
                      ? 'text-[#1B5E20] bg-green-50'
                      : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Useful Info</p>
                {usefulInfoLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-600"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;