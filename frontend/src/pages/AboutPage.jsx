import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Shield, Heart, Users } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { stats } from '../data/mockData';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-[#E8F5E9] to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                  About <span className="text-[#1B5E20]">Santa's Little Wieners</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Welcome to Santa's Little Wieners, where we specialize in raising healthy, happy, 
                  and well-socialized Dachshund puppies. For over a decade, our family has been 
                  dedicated to breeding these lovable companions with the utmost care and attention.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Each of our puppies is raised in a loving home environment, ensuring they're 
                  ready to bring warmth and joy to your family this holiday season and for years 
                  to come. We believe every family deserves the gift of unconditional love that 
                  only a Dachshund can provide.
                </p>
                <Link
                  to="/available-puppies"
                  className="inline-flex items-center bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-full font-medium transition-colors"
                >
                  Meet Our Puppies
                </Link>
              </div>
              <div className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://santaslittlewieners.com/images/Charlie%20new.jpeg"
                    alt="Dachshund puppy"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                  <img
                    src="https://santaslittlewieners.com/images/Bianca%20new.jpeg"
                    alt="Dachshund puppy"
                    className="w-full h-48 object-cover rounded-xl shadow-lg mt-8"
                  />
                  <img
                    src="https://santaslittlewieners.com/images/Doris%20new.jpeg"
                    alt="Dachshund puppy"
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                  <img
                    src="https://santaslittlewieners.com/images/Lola%20new.jpeg"
                    alt="Dachshund puppy"
                    className="w-full h-48 object-cover rounded-xl shadow-lg mt-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-[#1B5E20]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stats.happyFamilies}</div>
                <div className="text-gray-200">Happy Families</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stats.yearsExperience}</div>
                <div className="text-gray-200">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stats.healthGuarantee}</div>
                <div className="text-gray-200">Health Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything we do is guided by our commitment to the health and happiness of our puppies and the families who adopt them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#C62828] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Love & Care</h3>
                <p className="text-gray-600 text-sm">
                  Every puppy is raised with love, attention, and the best care possible.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Health First</h3>
                <p className="text-gray-600 text-sm">
                  All puppies receive comprehensive health screenings and vaccinations.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600 text-sm">
                  We maintain the highest standards in breeding and puppy care.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#C62828] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Family</h3>
                <p className="text-gray-600 text-sm">
                  We treat every adopting family as an extension of our own.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Provide */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  What We Provide With Every Puppy
                </h2>
                <div className="space-y-4">
                  {[
                    'Lifetime health guarantee',
                    'Up-to-date vaccinations',
                    'Veterinary health certificate',
                    'Potty and crate training started',
                    'Puppy starter kit with food and toys',
                    'Blanket with mother\'s scent',
                    'Care instructions and support',
                    'De-worming completed',
                    'Microchip option available'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="https://santaslittlewieners.com/images/Chester%20new.jpeg"
                  alt="Happy Dachshund puppy"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1B5E20]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-gray-200 mb-8">
              Browse our available puppies and find the perfect addition to your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/available-puppies"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#1B5E20] px-8 py-4 rounded-full font-medium transition-colors"
              >
                View Available Puppies
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-4 rounded-full font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;