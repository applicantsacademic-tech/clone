import React from 'react';
import { Link } from 'react-router-dom';
import { Syringe, CheckCircle, Calendar } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const VaccinationsPage = () => {
  const vaccineSchedule = [
    { age: '6-8 weeks', vaccines: ['Distemper', 'Parvovirus'] },
    { age: '10-12 weeks', vaccines: ['DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus)'] },
    { age: '14-16 weeks', vaccines: ['DHPP Booster', 'Rabies'] },
    { age: '12-16 months', vaccines: ['DHPP Booster', 'Rabies Booster'] },
    { age: 'Annual', vaccines: ['DHPP', 'Rabies (as required by law)', 'Bordetella (optional)'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-6">
                <Syringe className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Vaccinations
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Learn about the vaccination schedule for your Dachshund puppy.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Provide</h2>
              <p className="text-gray-600 mb-8">
                All puppies from Santa's Little Wieners come with age-appropriate vaccinations. 
                Before leaving for their new homes, each puppy receives:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {[
                  'First round of puppy vaccinations',
                  'De-worming treatment',
                  'Veterinary health certificate',
                  'Vaccination records'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-[#1B5E20]" />
                Recommended Vaccination Schedule
              </h2>
              
              <div className="space-y-4">
                {vaccineSchedule.map((schedule, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4">
                    <div className="font-semibold text-[#1B5E20] mb-2">{schedule.age}</div>
                    <ul className="space-y-1">
                      {schedule.vaccines.map((vaccine, vIndex) => (
                        <li key={vIndex} className="text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-[#C62828] rounded-full mr-2"></span>
                          {vaccine}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFF3E0] rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Note</h3>
                <p className="text-gray-600">
                  Always consult with your veterinarian for the best vaccination schedule for your 
                  specific puppy. Requirements may vary based on your location and your puppy's health.
                </p>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/available-puppies"
                  className="inline-flex items-center bg-[#1B5E20] hover:bg-[#145214] text-white px-8 py-4 rounded-full font-medium transition-colors"
                >
                  View Our Vaccinated Puppies
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

export default VaccinationsPage;