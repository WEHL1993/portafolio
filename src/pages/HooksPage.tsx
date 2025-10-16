import React from 'react';
import Hooks from '../components/Hooks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const HooksPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black">
      <Header />
      <ScrollToTop />
      <main className="w-full overflow-x-hidden">
        <Hooks />
      </main>
      <Footer />
    </div>
  );
};

export default HooksPage;
