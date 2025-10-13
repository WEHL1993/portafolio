import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTyped } from '../hooks/useTyped';

// Importar imágenes
import desarrolloImg from '../assets/images/desarrollo.png';
import lecturaImg from '../assets/images/lectura.png';
import caminarImg from '../assets/images/caminar.png';

const AboutMe: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const typedRef = useTyped({
    strings: [t('about.description')],
    typeSpeed: 15,
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
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-2xl flex flex-col max-w-4xl mx-auto"
          >
            {/* Terminal Header */}
            <div className="bg-gray-700 px-4 py-3 flex items-center space-x-2 flex-shrink-0">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-300 text-sm font-mono">Terminal</span>
              </div>
            </div>

            {/* Terminal Content - Text Area */}
            <div className="p-6 bg-black text-green-400 font-mono min-h-[320px] sm:min-h-[350px] md:min-h-[320px] lg:min-h-[280px]">
              {/* Prompt */}
              <div className="mb-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2"
                >
                  <span className="text-red-400 font-bold">user@portfolio:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">{t('about.prompt')}</span>
                    <span className="text-white">$</span>
                  </div>
                </motion.div>
              </div>

              {/* Typed Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-white leading-relaxed text-sm sm:text-base whitespace-pre-line"
              >
                <span ref={typedRef as React.RefObject<HTMLSpanElement>}></span>
              </motion.div>
            </div>

            {/* Fixed Images Section at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 2 }}
              className="p-4 bg-gray-900 border-t border-gray-700 flex-shrink-0"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-gray-800/50 rounded border border-red-700/30 overflow-hidden hover:border-red-500/50 transition-all duration-300 group">
                  {/* Imagen de Desarrollo */}
                  <div className="h-28 sm:h-32 bg-gradient-to-br from-red-950 to-black flex items-center justify-center relative overflow-hidden">
                    <img src={desarrolloImg} alt="Desarrollo" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-red-900/10 transition-all"></div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-red-400 font-bold text-sm sm:text-base mb-1 sm:mb-2">💻 Desarrollo</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Front-end moderno con React, TypeScript y herramientas actuales</p>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded border border-red-700/30 overflow-hidden hover:border-red-500/50 transition-all duration-300 group">
                  {/* Imagen de Lectura */}
                  <div className="h-28 sm:h-32 bg-gradient-to-br from-gray-900 to-red-900 flex items-center justify-center relative overflow-hidden">
                    <img src={lecturaImg} alt="Lectura" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-red-900/10 transition-all"></div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-red-400 font-bold text-sm sm:text-base mb-1 sm:mb-2">📚 Lectura</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Apasionado por los libros de desarrollo personal y tecnología</p>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded border border-red-700/30 overflow-hidden hover:border-red-500/50 transition-all duration-300 group">
                  {/* Imagen de Caminar */}
                  <div className="h-28 sm:h-32 bg-gradient-to-br from-black to-red-800 flex items-center justify-center relative overflow-hidden">
                    <img src={caminarImg} alt="Caminar" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-red-900/10 transition-all"></div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-red-400 font-bold text-sm sm:text-base mb-1 sm:mb-2">🚶‍♂️ Caminar</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">Despeja la mente, estimula la creatividad y mejora la salud mental</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
