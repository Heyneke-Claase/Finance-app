import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import ApplicationForm from './components/ApplicationForm';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 80,
      once: true,
      easing: 'ease-in-out',
    });
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Hero />
          <Calculator />
          <Process />
          <WhyUs />
          <ApplicationForm />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;