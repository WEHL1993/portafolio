import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useBaffle } from '../hooks/useBaffle';

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
          </div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex justify-center space-x-4 mt-8"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-red-400 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3 
                }}
              />
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-sm font-light"
            >
              <div className="flex flex-col items-center space-y-2">
                <span>Scroll Down</span>
                <div className="w-px h-8 bg-red-400"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
