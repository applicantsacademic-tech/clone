import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Dog, Heart, Shield, Smile } from 'lucide-react';
import { heroSlides } from '../../data/mockData';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const features = [
    { icon: Dog, text: 'Family Dogs' },
    { icon: Heart, text: 'Small Dachshunds' },
    { icon: Shield, text: 'Health Guaranteed' },
    { icon: Smile, text: 'Emotional Support Puppies' }
  ];

  return (
    <section className="bg-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Image Slider */}
          <div className="lg:w-3/5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              {/* Logo Overlay */}
              <div className="absolute top-4 left-4 z-10 flex items-center">
                <img 
                  src="https://santaslittlewieners.com/images/logo-dog.png" 
                  alt="" 
                  className="h-10 w-auto"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <div className="ml-2">
                  <span className="text-white font-serif text-xl font-bold italic drop-shadow-lg">Santa's Little Wieners</span>
                </div>
              </div>

              {/* Slides */}
              <div className="relative h-[400px] lg:h-[500px]">
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              {/* CTA Button on Slider */}
              <Link
                to="/available-puppies"
                className="absolute bottom-6 left-6 bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-full font-medium flex items-center space-x-2 shadow-lg transition-colors"
              >
                <span>Available Puppies</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </Link>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 right-6 flex space-x-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 h-full">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Find Your <span className="text-[#C62828]">Lifelong</span>
                <br />Furry Companion
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We connect wonderful families with happy, healthy puppies from 
                pre-screened, hand-selected breeders. Your perfect little wiener 
                is waiting for you this holiday season.
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-[#1B5E20]" />
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                to="/available-puppies"
                className="inline-flex items-center justify-center w-full bg-[#1B5E20] hover:bg-[#145214] text-white px-6 py-4 rounded-full font-medium transition-colors"
              >
                <span>Available Puppies</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;