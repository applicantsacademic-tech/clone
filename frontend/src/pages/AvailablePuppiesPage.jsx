import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Check, MessageCircle, Phone } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { puppies, expenseTable, faqData } from '../data/mockData';

const AvailablePuppiesPage = () => {
  const [expandedPuppy, setExpandedPuppy] = useState(null);

  const toggleExpand = (id) => {
    setExpandedPuppy(expandedPuppy === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-white py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Available Puppies
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find your perfect furry companion from our adorable Dachshund puppies
            </p>
          </div>
        </section>

        {/* Holiday Delivery Banner */}
        <section className="bg-[#1B5E20] py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">
                Holiday Delivery Update - Christmas Ready Puppies
              </h2>
              <p className="text-gray-200 leading-relaxed">
                To make this Christmas extra special, we are ensuring fast and reliable delivery within 
                24 hours during the holiday season. <strong>Pickup & Delivery Available - United States & Canada.</strong> 
                Whether you choose pickup or delivery, we are fully open and ready to help your new furry family 
                member arrive safely and on time for the holidays. Christmas is just around the corner - bring 
                home love, warmth, and companionship this season. Contact us today to reserve your puppy.
              </p>
            </div>
          </div>
        </section>

        {/* Puppies List */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-8">
              {puppies.map((puppy) => (
                <div
                  key={puppy.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-1/3 relative">
                      <img
                        src={puppy.image}
                        alt={`${puppy.name} - ${puppy.sex} Dachshund puppy`}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="lg:w-2/3 p-6 lg:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        {/* Left Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">Name: {puppy.name}</h3>
                            <span className="text-2xl font-bold text-[#1B5E20]">${puppy.price}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <span><strong>Sex:</strong> {puppy.sex}</span>
                            <span><strong>Age:</strong> {puppy.age}</span>
                            <span className="text-green-600 font-semibold"><strong>Status:</strong> {puppy.status}</span>
                          </div>

                          {/* Features */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                            {puppy.features.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600">
                                <Check className="w-4 h-4 text-[#1B5E20] mr-2 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 mb-4">
                            <Link
                              to="/contact"
                              className="bg-[#1B5E20] hover:bg-[#145214] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                              <Phone className="w-4 h-4" />
                              Contact Us
                            </Link>
                            <a
                              href={`sms:+12792412992?&body=Hello%20I%20am%20interested%20in%20this%20Dachshund%20Puppy%20${puppy.name}`}
                              className="bg-white border border-[#1B5E20] text-[#1B5E20] hover:bg-[#E8F5E9] px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                              <MessageCircle className="w-4 h-4" />
                              Send Text
                            </a>
                          </div>

                          {/* Ready Badge */}
                          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                            Ready for a new home
                          </div>
                        </div>
                      </div>

                      {/* Expandable Description */}
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <button
                          onClick={() => toggleExpand(puppy.id)}
                          className="text-[#1B5E20] font-medium hover:underline"
                        >
                          {expandedPuppy === puppy.id ? 'Show Less' : 'Read More About ' + puppy.name}
                        </button>
                        
                        {expandedPuppy === puppy.id && (
                          <div className="mt-4 space-y-4 animate-fadeIn">
                            <p className="text-gray-600 leading-relaxed">{puppy.description}</p>
                            <p className="text-gray-600"><strong>Coat:</strong> {puppy.coat}</p>
                            <p className="text-sm text-gray-500">
                              Our puppies come with all paperwork and a puppy kit. Vet checked and up to date on shots.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Preview */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="https://santaslittlewieners.com/images/image.png" 
                  alt="Google Reviews" 
                  className="h-8"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                What Our Families Say
              </h2>
              <p className="text-gray-600">Read reviews from happy dachshund owners</p>
            </div>
            <div className="text-center">
              <Link
                to="/testimonials"
                className="inline-flex items-center bg-[#1B5E20] hover:bg-[#145214] text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                View All Reviews
              </Link>
            </div>
          </div>
        </section>

        {/* Expense Table */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              Expenses For A Dachshund Puppy
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Here's a simple table illustrating potential monthly expenses for a dachshund puppy:
            </p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#1B5E20] text-white">
                    <th className="px-6 py-4 text-left font-semibold">Expense Item</th>
                    <th className="px-6 py-4 text-right font-semibold">Estimated Monthly Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseTable.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-gray-700">{row.item}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{row.cost}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#E8F5E9] font-semibold">
                    <td className="px-6 py-4 text-gray-900">Total Estimated Cost</td>
                    <td className="px-6 py-4 text-right text-gray-900">$270 – $455</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
              Questions To Ask Before Buying A Dachshund Puppy
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. {faq.question}</h3>
                  <p className="text-gray-600">A. {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Health Care Section */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <img
                  src="https://santaslittlewieners.com/images/vet-puppy.jpg"
                  alt="Veterinarian examining a Dachshund puppy"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600';
                  }}
                />
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">We Prioritize Health Care</h3>
                <p className="text-gray-600 leading-relaxed">
                  We place a strong emphasis on our puppies' health, making sure they receive all 
                  necessary vaccinations before they join their new families. This ensures they are 
                  safe around both children and adults. Each puppy comes with a lifetime health guarantee, 
                  is fully vaccinated, and includes a veterinary certificate.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AvailablePuppiesPage;