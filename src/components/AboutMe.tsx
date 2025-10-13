import React, { useState, useEffect } from 'react';
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
  
  // Estado para guardar si estamos en vista móvil
  const [isMobile, setIsMobile] = useState(false);

  // Efecto para detectar el tamaño de pantalla
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Comprobar al iniciar
    checkIfMobile();
    
    // Añadir listener para cambios de tamaño
    window.addEventListener('resize', checkIfMobile);
    
    // Limpiar listener al desmontar
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Ajustar el texto según el tamaño de pantalla
  const getAboutText = () => {
    if (isMobile) {
      const fullText = t('about.description');
      // En móviles mostramos una versión más corta y optimizada
      const paragraphs = fullText.split('\n\n');
      // Acortamos el primer párrafo para que quepa mejor en móviles
      const mobileText = paragraphs[0].split('.').slice(0, 3).join('.') + '.';
      return mobileText;
    }
    return t('about.description');
  };

  const typedRef = useTyped({
    strings: [getAboutText()],
    typeSpeed: 2, // Velocidad máxima (2ms entre caracteres)
    backSpeed: 0, // Sin retroceso
    showCursor: true,
    cursorChar: '_',
    // Configuración adicional para mejorar el rendimiento
    loop: false,
    startDelay: 0,
    // Función al completar la animación
    onComplete: () => {
      // No hacer nada al completar, el texto quedará visible
    }
  });

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

            {/* Terminal Content - Text Area 100% adaptativa */}
            <div 
              className={`${isMobile ? 'p-2.5' : 'p-3 md:p-6'} bg-black text-green-400 font-mono`}
              style={{
                height: 'auto',
                minHeight: isMobile ? '180px' : '380px', /* Altura reducida para móviles */
                maxHeight: isMobile ? '230px' : 'none', /* Limitar altura en móviles */
              }}
            >
              {/* Prompt */}
              <div className="mb-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-0.5 sm:gap-2"
                >
                  <span className="text-red-400 font-bold text-xs sm:text-sm">user@portfolio:</span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-blue-400 text-xs sm:text-sm">{t('about.prompt')}</span>
                    <span className="text-white text-xs sm:text-sm">$</span>
                  </div>
                </motion.div>
              </div>

              {/* Typed Description - Adaptativo para todos los dispositivos */}
              <motion.div
                initial={{ opacity: 1 }} 
                animate={{ opacity: 1 }}
                className={`text-white ${isMobile ? 'leading-snug' : 'leading-tight'} text-xs sm:text-sm md:text-base whitespace-pre-line`}
              >
                {/* El texto aparecerá aquí y ajustará la altura del contenedor */}
                <div className="relative">
                  <span ref={typedRef as React.RefObject<HTMLSpanElement>}></span>
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
