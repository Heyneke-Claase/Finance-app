// src/App.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import './style.css'; // Your global styles
// Assuming your components will be in a 'components' folder
import AppNavbar from './components/AppNavbar';
import HeroSection from './components/HeroSection';
import LoanCalculator from './components/LoanCalculator';
import HowItWorksSection from './components/HowItWorksSection';
import WhyUsSection from './components/WhyUsSection';
import ApplicationForm from './components/ApplicationForm';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import AppFooter from './components/AppFooter';

// Import react-bootstrap CSS if not already handled by your style.css
// import 'bootstrap/dist/css/bootstrap.min.css'; // Or from react-bootstrap if preferred

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 80,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <>
      <AppNavbar />
      <main>
        <HeroSection />
        <LoanCalculator />
        <HowItWorksSection />
        <WhyUsSection />
        <ApplicationForm />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <AppFooter />
    </>
  );
}

export default App;