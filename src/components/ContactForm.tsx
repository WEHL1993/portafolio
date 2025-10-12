import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';
import { Check, Send, AlertCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    error,
    handleChange,
    handleSubmit,
    resetForm
  } = useContactForm();

  if (isSubmitted) {
    return (
      <div className="mt-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-900/30 border border-green-600/50 rounded-lg p-6 text-center"
        >
          <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h4 className="text-white font-semibold mb-2">¡Mensaje enviado!</h4>
          <p className="text-gray-300 text-sm mb-4">
            Tu mensaje ha sido enviado correctamente. Te responderé pronto.
          </p>
          <motion.button
            onClick={resetForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Enviar otro mensaje
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h4 className="text-white font-semibold mb-4">Mensaje rápido</h4>
      
      <motion.form 
        onSubmit={handleSubmit}
        className="space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Tu mensaje"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-2 text-red-400 text-sm"
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.05 } : {}}
          whileTap={!isSubmitting ? { scale: 0.95 } : {}}
          className={`
            flex items-center justify-center space-x-2 w-full py-2 px-4 rounded font-medium transition-all
            ${isSubmitting 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-red-600 hover:bg-red-700'
            } text-white
          `}
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Enviar</span>
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ContactForm;