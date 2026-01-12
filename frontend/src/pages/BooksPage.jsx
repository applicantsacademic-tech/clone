import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BooksPage = () => {
  const books = [
    {
      id: 1,
      title: "The Happy Dachshund & You",
      image: "https://santaslittlewieners.com/images/The-Happy-Dachshund-You.png",
      description: "A comprehensive guide to caring for your Dachshund, filled with valuable tips, tasty recipes, and insights into care."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-white py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Books
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover more ways to enhance your Dachshund experience with our latest books! 
              Filled with valuable tips, tasty recipes, and insights into care.
            </p>
          </div>
        </section>

        {/* Books Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-8">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full max-w-xs mx-auto shadow-xl rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400';
                      }}
                    />
                  </div>
                  <div className="lg:w-2/3 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {book.title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {book.description}
                    </p>
                    <p className="text-gray-600 mb-6">
                      These guides are perfect for every Dachshund owner. We also offer free books for all 
                      our puppy families. Check them out today and strengthen your bond with your furry friend!
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="inline-flex items-center bg-[#1B5E20] hover:bg-[#145214] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Learn More
                      </button>
                      <button className="inline-flex items-center bg-white border border-[#1B5E20] text-[#1B5E20] hover:bg-[#E8F5E9] px-6 py-3 rounded-lg font-medium transition-colors">
                        <Download className="w-5 h-5 mr-2" />
                        Download Free Sample
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-[#1B5E20]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Welcome a Dachshund Into Your Life?
            </h2>
            <p className="text-gray-200 mb-6">
              Browse our available puppies and find your perfect furry companion.
            </p>
            <Link
              to="/available-puppies"
              className="inline-flex items-center bg-white hover:bg-gray-100 text-[#1B5E20] px-8 py-4 rounded-full font-medium transition-colors"
            >
              View Available Puppies
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BooksPage;