import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ZoomIn } from 'lucide-react';

const Certificates: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

  const certificates = t('certificates.items', { returnObjects: true }) as string[];

  const openLightbox = (index: number) => {
    setSelectedCertificate(index);
  };

  const closeLightbox = () => {
    setSelectedCertificate(null);
  };

  return (
    <section id="certificates" className="w-full py-20 bg-gradient-to-br from-black to-red-950 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            {t('certificates.title')}
          </motion.h2>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {certificates.map((certificate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-700/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20">
                  {/* Certificate Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-red-900 to-red-700 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">🏆</div>
                        <div className="text-sm font-medium px-4">
                          {certificate.split(' - ')[0]}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-red-600 text-white p-3 rounded-full"
                      >
                        <ZoomIn size={24} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-red-300 transition-colors">
                      {certificate}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Certificado verificado</span>
                      <span className="text-green-400">✓</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedCertificate !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                onClick={closeLightbox}
              >
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.5 }}
                  className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 z-10 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Certificate Content */}
                  <div className="p-8 text-center">
                    <div className="mb-6">
                      <div className="text-6xl mb-4">🏆</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {certificates[selectedCertificate]}
                      </h3>
                      <p className="text-gray-600">
                        Certificado otorgado por completar exitosamente el curso
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-100 to-red-50 p-6 rounded-lg">
                      <p className="text-gray-700 font-medium">
                        Este certificado valida las competencias adquiridas en el área de desarrollo web y programación.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Achievements Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-red-900/20 to-red-700/20 border border-red-700/30 rounded-lg p-8 w-full">
              <h3 className="text-2xl font-bold text-white mb-4">Formación Continua</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Comprometido con el aprendizaje constante y la actualización de conocimientos 
                en las últimas tecnologías del desarrollo web.
              </p>
              <div className="flex justify-center space-x-6 text-red-400">
                <div className="text-center">
                  <div className="text-3xl font-bold">{certificates.length}</div>
                  <div className="text-sm">Certificados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-sm">Horas de estudio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">3+</div>
                  <div className="text-sm">Plataformas</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
