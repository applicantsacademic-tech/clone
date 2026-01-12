import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/mockData';

const TestimonialsSection = ({ showAll = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayTestimonials = showAll ? testimonials : testimonials.slice(0, 9);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displayTestimonials.length / itemsPerPage);

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = showAll 
    ? displayTestimonials 
    : displayTestimonials.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: '#FDF6E9' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Google Reviews Badge */}
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://santaslittlewieners.com/images/image.png" 
              alt="Google Reviews 5 Stars" 
              className="h-8"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="inline-block bg-[#C62828] text-white text-sm px-4 py-2 rounded-full mb-4">
            Happy Families
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Families Say
          </h2>
          <p className="text-gray-600">
            Real stories from families who found their perfect companion with us.
          </p>

          {showAll && (
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1B5E20]">500+</div>
                <div className="text-sm text-gray-600">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1B5E20]">5.0</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1B5E20]">100%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons - Only for carousel mode */}
        {!showAll && (
          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={prevPage}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextPage}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${showAll ? '' : 'transition-all duration-300'}`}>
          {currentTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4 mb-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {testimonial.initials}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">Reviewer</p>
                </div>
                {/* Rating */}
                <div className="flex items-center text-[#1B5E20] font-semibold">
                  {testimonial.rating}/5
                </div>
              </div>

              {/* Stars */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {testimonial.review}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                <span>{testimonial.timeAgo} - {testimonial.location}</span>
                <div className="flex items-center space-x-2">
                  <img 
                    src="https://santaslittlewieners.com/images/image%20copy.png" 
                    alt="Google" 
                    className="h-4"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <span className="text-[#1B5E20] font-medium">Santa's Little Wieners</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots - Only for carousel mode */}
        {!showAll && (
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#1B5E20]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;