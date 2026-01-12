import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HealthGuaranteePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Health Guarantee
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                At Santa's Little Wieners, we stand behind the health of every puppy we raise.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Lifetime Health Guarantee</h2>
              
              <div className="space-y-6 text-gray-600">
                <p>
                  We are committed to breeding healthy, happy Dachshund puppies. Every puppy from 
                  Santa's Little Wieners comes with a comprehensive lifetime health guarantee that 
                  covers genetic and hereditary conditions.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8">What's Covered:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Congenital defects',
                    'Hereditary conditions',
                    'Genetic disorders',
                    'Life-threatening illnesses'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mt-8">What Every Puppy Receives:</h3>
                <div className="space-y-3">
                  {[
                    'Complete veterinary examination before leaving',
                    'Age-appropriate vaccinations',
                    'De-worming treatments',
                    'Health certificate from licensed veterinarian',
                    'Detailed health records'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#E8F5E9] rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Promise</h3>
                  <p>
                    If any covered health issue arises, we will work with you to find the best solution. 
                    Your puppy's health and your family's peace of mind are our top priorities.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-[#1B5E20] hover:bg-[#145214] text-white px-8 py-4 rounded-full font-medium transition-colors"
                >
                  Contact Us for Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HealthGuaranteePage;