import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ContactForm from '../components/home/ContactForm';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ContactForm isStandalone={true} />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;