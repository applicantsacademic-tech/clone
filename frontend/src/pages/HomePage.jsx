import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedPuppies from '../components/home/FeaturedPuppies';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HolidaySection from '../components/home/HolidaySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactForm from '../components/home/ContactForm';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPuppies />
        <AboutSection />
        <WhyChooseUs />
        <HolidaySection />
        <TestimonialsSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;