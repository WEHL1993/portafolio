import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'skills', href: '#skills' },
    { key: 'certificates', href: '#certificates' },
    { key: 'contact', href: '#contact' }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('portfolio-language', lng);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-red-900 via-red-800 to-black backdrop-blur-md border-b border-red-700/20 overflow-x-hidden"
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo/Profile */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xl border-2 border-red-400">
              WH
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              Wilson Hernández
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-white hover:text-red-300 transition-colors duration-200 font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(`nav.${item.key}`)}
              </motion.a>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.button
              onClick={() => changeLanguage('es')}
              className={`flex items-center space-x-2 px-3 py-2 rounded ${
                i18n.language === 'es' ? 'bg-red-600' : 'bg-red-800/50'
              } text-white transition-colors font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-bold">ES</span>
            </motion.button>
            <motion.button
              onClick={() => changeLanguage('en')}
              className={`flex items-center space-x-2 px-3 py-2 rounded ${
                i18n.language === 'en' ? 'bg-red-600' : 'bg-red-800/50'
              } text-white transition-colors font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-bold">EN</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-red-700/20"
            >
              <nav className="flex flex-col space-y-2 mt-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-white hover:text-red-300 transition-colors duration-200 py-2 px-4 rounded hover:bg-red-800/30"
                    whileHover={{ x: 10 }}
                  >
                    {t(`nav.${item.key}`)}
                  </motion.a>
                ))}
              </nav>
              
              {/* Mobile Language Selector */}
              <div className="flex items-center space-x-2 mt-4 px-4">
                <motion.button
                  onClick={() => changeLanguage('es')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded ${
                    i18n.language === 'es' ? 'bg-red-600' : 'bg-red-800/50'
                  } text-white transition-colors font-medium`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-bold">ES</span>
                </motion.button>
                <motion.button
                  onClick={() => changeLanguage('en')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded ${
                    i18n.language === 'en' ? 'bg-red-600' : 'bg-red-800/50'
                  } text-white transition-colors font-medium`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-bold">EN</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
