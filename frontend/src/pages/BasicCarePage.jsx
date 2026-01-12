import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Droplets, Utensils, Scissors, Activity, Home } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BasicCarePage = () => {
  const careTips = [
    {
      icon: Utensils,
      title: 'Feeding',
      tips: [
        'Feed high-quality puppy food appropriate for their age',
        '3-4 small meals daily for puppies, 2 meals for adults',
        'Always provide fresh, clean water',
        'Avoid overfeeding to prevent obesity'
      ]
    },
    {
      icon: Scissors,
      title: 'Grooming',
      tips: [
        'Brush coat regularly (frequency depends on coat type)',
        'Bathe monthly or as needed',
        'Trim nails every 2-3 weeks',
        'Clean ears weekly to prevent infections'
      ]
    },
    {
      icon: Activity,
      title: 'Exercise',
      tips: [
        '30-60 minutes of daily activity',
        'Short walks are better than long ones',
        'Avoid jumping and stairs when possible',
        'Interactive play keeps them mentally stimulated'
      ]
    },
    {
      icon: Heart,
      title: 'Health',
      tips: [
        'Regular veterinary check-ups',
        'Keep vaccinations up to date',
        'Monthly flea and tick prevention',
        'Watch for signs of back problems'
      ]
    },
    {
      icon: Home,
      title: 'Environment',
      tips: [
        'Provide a cozy, draft-free sleeping area',
        'Use ramps instead of stairs when possible',
        'Keep harmful items out of reach',
        'Create a safe outdoor play area'
      ]
    },
    {
      icon: Droplets,
      title: 'Dental Care',
      tips: [
        'Brush teeth several times per week',
        'Provide dental chews and toys',
        'Annual professional dental cleaning',
        'Watch for signs of dental problems'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-12 lg:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Basic Dachshund Care
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Essential tips for keeping your Dachshund happy and healthy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careTips.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-[#1B5E20]" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{category.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2 text-gray-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#1B5E20] rounded-full mt-2 flex-shrink-0"></span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-[#1B5E20] rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Need More Help?</h2>
              <p className="text-gray-200 mb-6">
                We provide lifetime support for all our puppy families. Don't hesitate to reach out!
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white hover:bg-gray-100 text-[#1B5E20] px-8 py-4 rounded-full font-medium transition-colors"
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

export default BasicCarePage;