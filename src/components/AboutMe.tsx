import React, { useEffect } from 'react';
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

  // Usamos el texto completo de las traducciones
  const aboutFullText = t('about.description');

  // Configuramos la animación de escritura
  const typedRef = useTyped({
    strings: [aboutFullText],
    typeSpeed: 1, // Velocidad máxima de escritura
    startDelay: 100,
    showCursor: true,
    cursorChar: '_',
    loop: false,
    backSpeed: 0
  });

  // Cuando el contenido del terminal aumenta, hacer scroll al final para que todo sea visible
  useEffect(() => {
    const container = document.getElementById('terminal-content');
    if (!container) return;

    const observer = new MutationObserver(() => {
      // scroll hacia el final suavemente
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    });

    observer.observe(container, { childList: true, subtree: true, characterData: true });

    // limpiar
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="w-full py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-black overflow-x-hidden">
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
            className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 lg:mb-20 text-white"
          >
            {t('about.title')}
          </motion.h2>

          {/* Terminal Container - Tamaño fijo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-2xl flex flex-col w-full"
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

            {/* Terminal Content - Tamaño fijo responsive con scroll interno */}
            <div 
              id="terminal-content"
              className="p-1.5 max-[359px]:p-1.5 min-[360px]:p-2 min-[414px]:p-2.5 sm:p-3 md:p-6 bg-black text-green-400 font-mono w-full max-w-full overflow-auto h-[65vh] md:overflow-auto md:h-72 lg:h-80"
            >
              {/* Prompt */}
              <div className="mb-1 max-[359px]:mb-0.5 min-[360px]:mb-1 min-[414px]:mb-1 sm:mb-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-col max-[359px]:flex-col min-[360px]:flex-row items-start sm:items-center gap-0.5 sm:gap-2"
                >
                  <span className="text-red-400 font-bold max-[359px]:text-[0.65rem] min-[360px]:text-[0.7rem] min-[414px]:text-xs sm:text-sm">user@portfolio:</span>
                  <div className="flex items-center gap-0.5 sm:gap-2">
                    <span className="text-blue-400 max-[359px]:text-[0.65rem] min-[360px]:text-[0.7rem] min-[414px]:text-xs sm:text-sm">{t('about.prompt')}</span>
                    <span className="text-white max-[359px]:text-[0.65rem] min-[360px]:text-[0.7rem] min-[414px]:text-xs sm:text-sm">$</span>
                  </div>
                </motion.div>
              </div>

              {/* Texto directo sin animación de escritura - Versión simplificada para evitar repeticiones */}
              <motion.div
                initial={{ opacity: 0 }} 
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-white leading-tight whitespace-pre-line"
              >
                {/* Una única versión del texto que se ajusta según el tamaño de pantalla */}
                <div className="relative">
                  <span 
                    ref={typedRef as React.RefObject<HTMLSpanElement>}
                    className="max-[359px]:text-[0.65rem] min-[360px]:text-[0.7rem] min-[414px]:text-xs sm:text-sm md:text-base max-[359px]:leading-tight min-[360px]:leading-tight"
                  ></span>
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
