import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ZoomIn } from 'lucide-react';
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiNodedotjs, 
  SiTypescript,
  SiBootstrap,
  SiJquery,
  SiSass,
  SiRedux
} from 'react-icons/si';

// Importar todas las imágenes de certificados
import certReact from '../assets/certificates/Certifiacado-React.png';
import certFrontend from '../assets/certificates/certificado-frontend.png';
import certHtmlCss from '../assets/certificates/Certificado-HTML-CSS.png';
import certJavaScript from '../assets/certificates/Certificado-JavaScript.png';
import certNodeJs from '../assets/certificates/Certificado-Node.js.png';
import certTypeScript from '../assets/certificates/Certificado-TypeScript.png';

type HistoryCertState = { certIndex?: number };

const Certificates: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

  // Definir certificados directamente con sus imágenes para evitar duplicados
  const certificatesList = [
    { 
      name: "HTML y CSS", 
      image: certHtmlCss,
      issuer: "UDEMY",
      year: "2025",
      fullName: "HTML y CSS - SoloLearn",
      icon: () => (
        <div className="flex items-center space-x-1">
          <SiHtml5 size={18} style={{color: '#E34F26'}} />
          <SiCss3 size={18} style={{color: '#1572B6'}} />
        </div>
      )
    },
    { 
      name: "JavaScript", 
      image: certJavaScript,
      issuer: "UDEMY",
      year: "2025",
      fullName: "JavaScript Moderno: Guía para dominar el lenguaje",
      icon: () => <SiJavascript size={20} style={{color: '#F7DF1E'}} />
    },
    { 
      name: "React", 
      image: certReact,
      issuer: "UDEMY",
      year: "2024",
      fullName: "React: De cero a experto (Hooks y MERN)",
      icon: () => <SiReact size={20} style={{color: '#61DAFB'}} />
    },
    { 
      name: "TypeScript", 
      image: certTypeScript,
      issuer: "UDEMY",
      year: "2025",
      fullName: "TypeScript: Tu completa guía y manual de mano",
      icon: () => <SiTypescript size={20} style={{color: '#3178C6'}} />
    },
    { 
      name: "Node.js", 
      image: certNodeJs,
      issuer: "UDEMY",
      year: "2025",
      fullName: "Node.js: De cero a experto",
      icon: () => <SiNodedotjs size={20} style={{color: '#339933'}} />
    },
    { 
      name: "Frontend Frameworks", 
      image: certFrontend,
      issuer: "FREECODECAMP",
      year: "2025",
      fullName: "Frontend Frameworks: Bootstrap, jQuery, SASS, React, Redux",
      icon: () => (
        <div className="grid grid-cols-5 gap-1 justify-items-center mb-1">
          <SiBootstrap size={18} style={{color: '#7952B3'}} />
          <SiJquery size={18} style={{color: '#0769AD'}} />
          <SiSass size={18} style={{color: '#CC6699'}} />
          <SiReact size={18} style={{color: '#61DAFB'}} />
          <SiRedux size={18} style={{color: '#764ABC'}} />
        </div>
      )
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedCertificate(index);
    // Guardar el certificado actual para poder scrollear a él al volver
    try { sessionStorage.setItem('lastCertificate', String(index)); } catch { /* ignore */ }
    // Añadir una entrada en el historial para que el botón atrás cierre el lightbox
    try {
      window.history.pushState({ certIndex: index }, '', `#certificate-${index}`);
    } catch (err) {
      // si falla por cualquier motivo, no bloqueamos la apertura
      console.warn('pushState failed', err);
    }
  };

  const closeLightbox = () => {
    // Si la entrada actual del historial corresponde a un certificado, retrocedemos
    // para disparar popstate y dejar que el listener cierre el lightbox.
    try {
      const st = window.history.state as unknown;
      if (st && typeof (st as HistoryCertState).certIndex === 'number') {
        window.history.back();
        return;
      }
    } catch {
      // seguir con el cierre normal si algo falla
    }

    setSelectedCertificate(null);
    // Asegurar que volvemos al certificado que vimos (afuera de la card) si existe
    try {
      const last = sessionStorage.getItem('lastCertificate');
      if (last) {
        const el = document.getElementById(`certificate-${last}`);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
        }
        sessionStorage.removeItem('lastCertificate');
        return;
      }
    } catch {
      // ignore
    }

    // Fallback: scrollear a la sección de certificados
    const el = document.getElementById('certificates');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Escuchar cambios en el historial para abrir/cerrar el lightbox con back/forward
  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const state = e.state as unknown;
      if (state && typeof (state as HistoryCertState).certIndex === 'number') {
        setSelectedCertificate((state as HistoryCertState).certIndex as number);
      } else {
        // Si no hay estado de certificado, cerrar el lightbox y navegar al área
        setSelectedCertificate(null);
        try {
          const last = sessionStorage.getItem('lastCertificate');
          if (last) {
            const el = document.getElementById(`certificate-${last}`);
            if (el) {
              setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
            }
            sessionStorage.removeItem('lastCertificate');
            return;
          }
        } catch {
          // ignore
        }

        const el = document.getElementById('certificates');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

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
            {certificatesList.map((certificate, index) => (
              <motion.div
                id={`certificate-${index}`}
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-red-700/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20">
                  {/* Certificate Image Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={certificate.image}
                      alt={`Miniatura de ${certificate.name}`}
                      className="object-cover w-full h-full"
                    />
                    
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
                  <div className="p-4 flex flex-col items-center">
                    <div className="flex items-center mb-2 justify-center">
                      {certificate.icon && certificate.icon()}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-300 transition-colors text-center">
                      {certificate.name}
                    </h3>
                    <div className="w-full flex items-center justify-center text-xs">
                      <span className="text-gray-400 mr-2">{certificate.issuer}</span>
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
                  className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
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
                  <div className="p-4 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedCertificate !== null && certificatesList[selectedCertificate].fullName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {selectedCertificate !== null && certificatesList[selectedCertificate].issuer} · {selectedCertificate !== null && certificatesList[selectedCertificate].year}
                    </p>
                    
                    {/* Certificate Image */}
                    <div className="max-h-[70vh] overflow-auto">
                      <img 
                        src={selectedCertificate !== null ? certificatesList[selectedCertificate].image : ''} 
                        alt={`Certificado de ${selectedCertificate !== null ? certificatesList[selectedCertificate].name : ''}`}
                        className="mx-auto rounded-lg shadow-lg max-w-full"
                      />
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
                  <div className="text-3xl font-bold">{certificatesList.length}</div>
                  <div className="text-sm">Certificados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">400+</div>
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
