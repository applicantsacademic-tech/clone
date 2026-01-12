import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { puppies } from '../../data/mockData';

const FeaturedPuppies = () => {
  const featuredPuppies = puppies.slice(0, 5);

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden" style={{ backgroundColor: '#1B5E20' }}>
      {/* Christmas Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30l-5-5 5-5 5 5-5 5zm0-20l-5-5 5-5 5 5-5 5zm20 20l-5-5 5-5 5 5-5 5zm-40 0l-5-5 5-5 5 5-5 5zm20 20l-5-5 5-5 5 5-5 5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Featured Puppies <span className="text-2xl">🦴</span>
          </h2>
          <p className="text-gray-200 text-lg italic">
            Explore Our Adorable Dachshund Puppies Ready for Their Forever Homes!
          </p>
        </div>

        {/* Puppies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {featuredPuppies.map((puppy) => (
            <div
              key={puppy.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={puppy.image}
                  alt={puppy.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-[#C62828] text-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
                  <Star className="w-3 h-3 fill-current mr-1" />
                  {puppy.rating.toFixed(1)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-[#1B5E20] font-semibold text-lg mb-2">{puppy.name}</h3>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-gray-900 font-bold text-xl">${puppy.price - 100}</span>
                  <span className="text-[#C62828] line-through text-sm">${puppy.originalPrice}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="text-green-600 font-medium">Available</span>
                  <span>Ready Now</span>
                </div>
                <Link
                  to="/available-puppies"
                  className="block w-full bg-[#1B5E20] hover:bg-[#145214] text-white text-center py-2.5 rounded-lg font-medium transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPuppies;