import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, MapPin, Clock, CheckCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PickupDeliveryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Pickup & Delivery
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer flexible options to get your new puppy safely to you.
              </p>
            </div>

            <div className="space-y-8">
              {/* Pickup Option */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#1B5E20]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">In-Person Pickup</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  We welcome families to visit our home and meet their new puppy in person. This gives 
                  you the opportunity to see where your puppy was raised and meet our family.
                </p>
                <div className="space-y-3">
                  {[
                    'Meet your puppy before taking them home',
                    'See our clean, loving environment',
                    'Get hands-on care instructions',
                    'Receive all paperwork and starter kit in person'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Option */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-[#1B5E20]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Safe Delivery</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Can't make it to us? We offer safe, comfortable delivery options throughout the 
                  United States and Canada. Your puppy's safety and comfort are our top priorities.
                </p>
                <div className="space-y-3">
                  {[
                    'Available throughout United States & Canada',
                    'Climate-controlled transport',
                    'Regular updates during transit',
                    'All paperwork and starter kit included'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Holiday Special */}
              <div className="bg-[#C62828] rounded-2xl p-8 text-white">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Holiday Delivery Special</h2>
                </div>
                <p className="text-gray-100 mb-4">
                  To make this Christmas extra special, we are ensuring fast and reliable delivery 
                  within 24 hours during the holiday season!
                </p>
                <p className="text-gray-200">
                  Christmas is just around the corner - bring home love, warmth, and companionship 
                  this season. Contact us today to reserve your puppy.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center bg-[#1B5E20] hover:bg-[#145214] text-white px-8 py-4 rounded-full font-medium transition-colors"
              >
                Contact Us to Arrange Pickup/Delivery
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PickupDeliveryPage;