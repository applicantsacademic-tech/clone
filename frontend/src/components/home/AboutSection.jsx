import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  const features = [
    { text: 'Family Raised' },
    { text: 'Vet Checked' },
    { text: 'Health Guaranteed' },
    { text: 'Lifetime Support' }
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Images Grid */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <img
                  src="https://santaslittlewieners.com/images/Charlie%20new.jpeg"
                  alt="Adorable Dachshund puppy by fireplace"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://santaslittlewieners.com/images/Bianca%20new.jpeg"
                  alt="Sweet Dachshund puppy"
                  className="w-full h-40 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div>
                <img
                  src="https://santaslittlewieners.com/images/Lola%20new.jpeg"
                  alt="Beautiful Dachshund puppy"
                  className="w-full h-40 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <div className="inline-block bg-[#1B5E20] text-white text-sm px-4 py-2 rounded-full mb-4">
              About Us
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Spreading <span className="text-[#C62828]">Holiday Joy</span> One Puppy at a Time
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Welcome to Santa's Little Wieners, where we specialize in raising healthy, happy, 
              and well-socialized Dachshund puppies. For over a decade, our family has been 
              dedicated to breeding these lovable companions with the utmost care and attention.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Each of our puppies is raised in a loving home environment, ensuring they're 
              ready to bring warmth and joy to your family this holiday season and for years 
              to come. We believe every family deserves the gift of unconditional love that 
              only a Dachshund can provide.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#1B5E20]" />
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/available-puppies"
              className="inline-flex items-center bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Meet Our Puppies
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;