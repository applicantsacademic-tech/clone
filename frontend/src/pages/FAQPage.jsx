import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is a Dachshund a good breed?",
      answer: "Dachshunds are affectionate and playful dogs that require training and care. They are known for their loyalty and make excellent companions for individuals and families alike."
    },
    {
      question: "Is a Dachshund Puppy good for beginners?",
      answer: "Yes, Dachshunds are great dogs for first-time dog owners. They are affectionate, easy to get along with, and adapt well to different living situations."
    },
    {
      question: "Do Dachshunds make good family pets?",
      answer: "Not only are Dachshunds amazing companions, but they are also great family pets. They tend to get along with other pets and are good with kids when properly socialized."
    },
    {
      question: "Do Dachshund puppies smell bad?",
      answer: "With proper grooming and care, your puppy will not have a foul smell. Regular baths, dental care, and professional grooming when needed will keep your Dachshund fresh and clean."
    },
    {
      question: "What not to do with Dachshunds?",
      answer: "Dachshunds should not be made to jump from high places or climb steep stairs frequently. Due to their long backs and skeletal structure, they can easily damage their spines."
    },
    {
      question: "How long do Dachshunds live?",
      answer: "Dachshunds typically live 12-16 years with proper care. Some have been known to live even longer when given excellent nutrition, regular exercise, and veterinary care."
    },
    {
      question: "How much exercise does a Dachshund need?",
      answer: "Dachshunds need moderate exercise - about 30-60 minutes per day of walks and playtime. They enjoy short walks and interactive play sessions but shouldn't be over-exercised due to their build."
    },
    {
      question: "Are Dachshunds easy to train?",
      answer: "Dachshunds are intelligent but can be stubborn. Consistent, positive reinforcement training works best. They respond well to treats and praise. Early socialization is important."
    },
    {
      question: "What health issues are common in Dachshunds?",
      answer: "The most common health concern is Intervertebral Disc Disease (IVDD) due to their long spines. Maintaining a healthy weight and avoiding jumping can help prevent issues. Our puppies come with a lifetime health guarantee."
    },
    {
      question: "How do I reserve a puppy?",
      answer: "Contact us through our contact form or email us directly. We'll discuss available puppies, answer your questions, and guide you through the reservation process. A deposit secures your chosen puppy."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <section className="py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about Dachshunds and our breeding program.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      Q. {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-[#1B5E20] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600">
                        A. {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <a
                href="/contact"
                className="inline-flex items-center bg-[#1B5E20] hover:bg-[#145214] text-white px-8 py-4 rounded-full font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;