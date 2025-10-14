import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Certificates from '../components/Certificates';
import ContactFormSubmit from '../components/ContactFormSubmit';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Espera breve para asegurar que el DOM esté listo
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black">
      <Header />
      <main className="w-full overflow-x-hidden">
        <HeroSection />
        <AboutMe />
        <Projects />
        <Skills />
        <Certificates />
        
        {/* Formulario de contacto con FormSubmit */}
        <ContactFormSubmit />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
