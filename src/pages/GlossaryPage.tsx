import React from 'react';
import Glossary from '../components/Glossary';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const GlossaryPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black">
      <Header />
      <ScrollToTop />
      <main className="w-full overflow-x-hidden">
        <Glossary />
      </main>
      <Footer />
    </div>
  );
};

export default GlossaryPage;
