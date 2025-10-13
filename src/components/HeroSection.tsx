import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useBaffle } from '../hooks/useBaffle';
import { Linkedin, Github, Mail, Download } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const nameRef = useBaffle(t('hero.name'), { characters: '█▓▒░/<>', speed: 75 });

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-red-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-red-900/20"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-6xl font-bold border-4 border-red-400 shadow-2xl">
                WH
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-red-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Name with Baffle Effect */}
          <div className="space-y-4">
            <h1 
              ref={nameRef as React.RefObject<HTMLHeadingElement>}
              className="text-5xl md:text-7xl font-bold text-white mb-4 font-mono"
            >
              {t('hero.name')}
            </h1>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h2 className="text-2xl md:text-3xl text-red-300 font-light">
                {t('hero.role')}
              </h2>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8"
            >
              <motion.a
                href="mailto:wilsoneduardohl@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} className="text-red-400" />
                <span>wilsoneduardohl@gmail.com</span>
              </motion.a>

              <motion.a
                href="https://github.com/wilson-hernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} className="text-red-400" />
                <span>GitHub</span>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/wilson-hernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} className="text-red-400" />
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>

            {/* CV Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-8"
            >
              <motion.a
                href="/src/assets/cv/wilson-hernandez-cv.pdf"
                download
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                <span>Descargar CV</span>
              </motion.a>
            </motion.div>
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
