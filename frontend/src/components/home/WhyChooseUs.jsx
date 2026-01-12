import React from 'react';
import { Heart, Shield, Phone, Gift } from 'lucide-react';
import { stats } from '../../data/mockData';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Heart,
      title: 'Raised with Love',
      description: 'Every puppy is raised in our home with daily cuddles, socialization, and individual attention from day one.',
      color: 'bg-[#C62828]'
    },
    {
      icon: Shield,
      title: 'Health Guaranteed',
      description: 'All puppies come with a comprehensive health guarantee, up-to-date vaccinations, and veterinary health certificate.',
      color: 'bg-[#1B5E20]'
    },
    {
      icon: Phone,
      title: 'Lifetime Support',
      description: "We're here for you long after you take your puppy home. Questions, advice, or just to share photos - we're always available.",
      color: 'bg-[#1B5E20]'
    },
    {
      icon: Gift,
      title: 'Starter Kit Included',
      description: "Each puppy comes with a starter kit including food, toys, blanket with mom's scent, and care instructions.",
      color: 'bg-[#C62828]'
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#C62828] text-white text-sm px-4 py-2 rounded-full mb-4">
            Why Choose Us
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            The <span className="text-[#1B5E20]">Santa's Little Wieners</span> Difference
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're not just breeders - we're a family dedicated to raising the happiest, 
            healthiest Dachshunds you'll ever meet.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Promise Section */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Promise to You</h3>
              <p className="text-gray-600 leading-relaxed">
                When you choose a puppy from Santa's Little Wieners, you're not just getting a pet - 
                you're gaining a family member and joining our extended family. We take pride in 
                matching each puppy with the perfect home and ensuring a smooth transition for both 
                you and your new furry friend.
              </p>
            </div>
            <div className="lg:w-1/3 flex justify-center lg:justify-end">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B5E20]">{stats.happyFamilies}</div>
                  <div className="text-sm text-gray-600">Happy Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B5E20]">{stats.yearsExperience}</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B5E20]">{stats.healthGuarantee}</div>
                  <div className="text-sm text-gray-600">Health Guarantee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;