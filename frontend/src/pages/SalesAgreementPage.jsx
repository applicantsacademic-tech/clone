import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const SalesAgreementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Sales Agreement
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Understanding our sales agreement and policies.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
              <div className="space-y-8 text-gray-600">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Purchase Agreement</h2>
                  <p>
                    When you purchase a puppy from Santa's Little Wieners, you'll receive a comprehensive 
                    sales agreement that outlines the terms and conditions of your purchase. This document 
                    protects both you and your new puppy.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
                  <div className="space-y-3">
                    {[
                      'Lifetime health guarantee details',
                      'Vaccination and health records',
                      'Spay/neuter agreement (if applicable)',
                      'Return policy information',
                      'Breeder support commitments',
                      'Registration information'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Deposit & Payment</h3>
                  <p className="mb-4">
                    A non-refundable deposit is required to reserve your puppy. This deposit will be 
                    applied to the total purchase price. The remaining balance is due before or at 
                    the time of pickup/delivery.
                  </p>
                  <p>
                    We accept various payment methods for your convenience. Contact us for details 
                    on current payment options.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment to You</h3>
                  <p>
                    We are committed to the health and happiness of every puppy we raise. Our sales 
                    agreement reflects our dedication to responsible breeding and our promise to 
                    support you throughout your puppy's life.
                  </p>
                </section>

                <div className="bg-[#E8F5E9] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions?</h3>
                  <p>
                    If you have any questions about our sales agreement or policies, please don't 
                    hesitate to contact us. We're happy to explain everything in detail before you 
                    make your decision.
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

export default SalesAgreementPage;