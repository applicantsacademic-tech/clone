import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import AvailablePuppiesPage from "./pages/AvailablePuppiesPage";
import ContactPage from "./pages/ContactPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import AboutPage from "./pages/AboutPage";
import BooksPage from "./pages/BooksPage";
import HealthGuaranteePage from "./pages/HealthGuaranteePage";
import SalesAgreementPage from "./pages/SalesAgreementPage";
import BasicCarePage from "./pages/BasicCarePage";
import VaccinationsPage from "./pages/VaccinationsPage";
import FAQPage from "./pages/FAQPage";
import PickupDeliveryPage from "./pages/PickupDeliveryPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/available-puppies" element={<AvailablePuppiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/health-guarantee" element={<HealthGuaranteePage />} />
          <Route path="/sales-agreement" element={<SalesAgreementPage />} />
          <Route path="/basic-care" element={<BasicCarePage />} />
          <Route path="/vaccinations" element={<VaccinationsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/pickup-delivery" element={<PickupDeliveryPage />} />
          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;