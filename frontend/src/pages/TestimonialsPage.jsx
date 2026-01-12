import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TestimonialsSection from '../components/home/TestimonialsSection';

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-white py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://santaslittlewieners.com/images/image.png" 
                alt="Google Reviews 5 Stars" 
                className="h-10"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Customer Testimonials
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our happy families have to say about their new furry companions from Santa's Little Wieners!
            </p>
          </div>
        </section>

        {/* All Testimonials */}
        <TestimonialsSection showAll={true} />

        {/* CTA Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-[#1B5E20] rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Ready to Find Your Perfect Puppy?
              </h2>
              <p className="text-gray-200 mb-6">
                Browse our available dachshund puppies and find your new best friend today!
              </p>
              <Link
                to="/available-puppies"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-[#1B5E20] px-8 py-4 rounded-full font-medium transition-colors"
              >
                View Available Puppies
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;