import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, CalendarDays, Smile, Truck } from 'lucide-react';

const HolidaySection = () => {
  const features = [
    { icon: Heart, text: 'Perfect Family Gift', color: 'text-yellow-400' },
    { icon: CalendarDays, text: 'Holiday Ready', color: 'text-yellow-400' },
    { icon: Smile, text: 'Endless Happiness', color: 'text-yellow-400' },
    { icon: Truck, text: 'Safe Delivery', color: 'text-yellow-400' }
  ];

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden" style={{ backgroundColor: '#1B5E20' }}>
      {/* Christmas Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30l-5-5 5-5 5 5-5 5zm0-20l-5-5 5-5 5 5-5 5zm20 20l-5-5 5-5 5 5-5 5zm-40 0l-5-5 5-5 5 5-5 5zm20 20l-5-5 5-5 5 5-5 5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="lg:w-1/2">
            <div className="inline-block bg-[#1B5E20] border border-white/30 text-white text-sm px-4 py-2 rounded-full mb-4">
              This Holiday Season
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Spreading <span className="text-yellow-400 italic">Holiday Joy</span> One Puppy at a Time
            </h2>
            <p className="text-gray-200 mb-4 leading-relaxed">
              There's nothing quite like the magic of watching a child's face light up when 
              they meet their new best friend. This Christmas, give your family the gift that 
              keeps on giving - unconditional love wrapped in a furry, wagging package.
            </p>
            <p className="text-gray-200 mb-8 leading-relaxed">
              Our Dachshund puppies are raised with love and care, ready to become the heart 
              of your home. From their first tail wag to years of loyal companionship, your 
              Santa's Little Wiener will bring joy to every day - not just the holidays.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/available-puppies"
              className="inline-flex items-center bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Find Your Perfect Puppy
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Images */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 row-span-2">
                <img
                  src="https://santaslittlewieners.com/images/Doris%20new.jpeg"
                  alt="Adorable Dachshund puppy"
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                  style={{ minHeight: '400px' }}
                />
              </div>
              <div>
                <img
                  src="https://santaslittlewieners.com/images/Bianca%20new.jpeg"
                  alt="Cute Dachshund puppy"
                  className="w-full h-48 object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div>
                <img
                  src="https://santaslittlewieners.com/images/Charlie%20new.jpeg"
                  alt="Sweet Dachshund puppy"
                  className="w-full h-48 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidaySection;