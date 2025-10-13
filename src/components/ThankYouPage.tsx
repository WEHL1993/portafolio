import React from 'react';
import { motion } from 'framer-motion';

interface ThankYouPageProps {
  onSendAnother: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ onSendAnother }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/30 border border-red-700/30 rounded-lg p-8 max-w-md w-full text-center shadow-xl"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-600/20 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl font-bold text-white mb-2"
        >
          ¡Mensaje enviado!
        </motion.h2>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-300 mb-6"
        >
          Tu mensaje ha sido enviado correctamente. Te responderé pronto.
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={onSendAnother}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enviar otro mensaje
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;