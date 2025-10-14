import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUp, Linkedin, Github, Twitter } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { showScrollTop, scrollToTop } = useScrollToTop();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black py-4 border-t border-red-700/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm mb-2 md:mb-0"
          >
            © {currentYear} Wilson Hernández - Todos los derechos reservados
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-4"
          >
            <motion.a
              href="https://linkedin.com/in/wilson-hernandez"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={22} />
            </motion.a>
            <motion.a
              href="https://github.com/WEHL1993"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={22} />
            </motion.a>
            <motion.a
              href="https://x.com/WilsonEdua66971"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter size={22} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
          title={t('footer.scrollTop')}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
