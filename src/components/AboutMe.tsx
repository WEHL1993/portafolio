import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTyped } from '../hooks/useTyped';

const AboutMe: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const typedRef = useTyped({
    strings: [t('about.description')],
    typeSpeed: 50,
    showCursor: true,
    cursorChar: '_'
  });

  return (
    <section id="about" className="w-full py-20 bg-gradient-to-br from-gray-900 to-black overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            {t('about.title')}
          </motion.h2>

          {/* Terminal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="bg-gray-700 px-4 py-3 flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-300 text-sm font-mono">Terminal</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 bg-black text-green-400 font-mono">
              {/* Prompt */}
              <div className="mb-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-red-400">user@portfolio:</span>
                  <span className="text-blue-400">{t('about.prompt')}</span>
                  <span className="text-white">$</span>
                </motion.div>
              </div>

              {/* Typed Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-white leading-relaxed text-lg"
              >
                <span ref={typedRef as React.RefObject<HTMLSpanElement>}></span>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 2 }}
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-gray-800/50 p-4 rounded border border-red-700/30">
                  <h3 className="text-red-400 font-bold mb-2">💻 Desarrollo</h3>
                  <p className="text-gray-300 text-sm">Front-end moderno con React, TypeScript y herramientas actuales</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded border border-red-700/30">
                  <h3 className="text-red-400 font-bold mb-2">⚽ A.C. Milan</h3>
                  <p className="text-gray-300 text-sm">Fanático del equipo rossonero desde siempre</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded border border-red-700/30">
                  <h3 className="text-red-400 font-bold mb-2">🎭 Arte</h3>
                  <p className="text-gray-300 text-sm">Pasión por la actuación y la música</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
