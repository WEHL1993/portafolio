import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Hooks: React.FC = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        try {
          window.history.replaceState(null, '', '/#projects');
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } catch {
          navigate('/#projects', { replace: true });
        }
      } else {
        try {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/#projects', { replace: true });
          }
        } catch {
          navigate('/#projects', { replace: true });
        }
      }
    }, 300);
  };

  // Forzar scroll al encabezado Hooks al montar
  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById('hooks');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);

    return () => clearTimeout(t);
  }, []);

  return (
    <motion.section
      id="hooks"
      className="w-full py-20 bg-gradient-to-br from-black to-red-950 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
  <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
  onClick={handleClose}
  tabIndex={-1}
  onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        className="fixed top-14 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all z-50"
        aria-label="Cerrar Hooks"
        title="Cerrar Hooks"
      >
        <X size={24} />
      </motion.button>
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">Hooks</h1>

        <div className="space-y-6">
          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">¿Qué son los Hooks?</h2>
            <p className="text-gray-300 leading-relaxed">
              Los Hooks son funciones que permiten "enganchar" el estado y otras características de React desde componentes funcionales. Introducidos en React 16.8, permiten manejar estado, efectos secundarios, referencias y más sin escribir clases.
            </p>
          </div>

          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">Reglas básicas</h2>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>No llamar Hooks dentro de bucles, condiciones ni funciones anidadas.</li>
              <li>Llamar Hooks sólo desde componentes de React o desde Hooks personalizados.</li>
              <li>Mantener el orden de las llamadas entre renderizados.</li>
            </ul>
          </div>

          <div className="bg-gray-900/80 rounded-lg p-6 border border-red-700/20">
            <h2 className="text-2xl font-semibold text-white mb-2">Ejemplos útiles</h2>
            <p className="text-gray-300">
              useState, useEffect, useRef, useMemo, useCallback y useContext son los Hooks más utilizados. También se pueden crear Hooks personalizados para extraer lógica reutilizable.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hooks;
