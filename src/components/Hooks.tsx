import React from 'react';
import { motion } from 'framer-motion';

const Hooks: React.FC = () => {
  return (
    <motion.section
      id="hooks"
      className="w-full py-20 bg-gradient-to-br from-black to-red-950 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
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
