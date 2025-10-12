import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';

const SimpleContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear el mailto link con los datos del formulario
    const subject = `Mensaje desde el portafolio - ${formData.name}`;
    const body = `
Hola Wilson,

Nombre: ${formData.name}
Email: ${formData.email}

Mensaje:
${formData.message}

---
Este mensaje fue enviado desde tu portafolio web.
    `;
    
    const mailtoLink = `mailto:wilsoneduardohl@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abrir el cliente de correo del usuario
    window.location.href = mailtoLink;
    
    // Mostrar mensaje de confirmación
    setIsSubmitted(true);
    
    // Resetear después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="mt-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-900/30 border border-green-600/50 rounded-lg p-6 text-center"
        >
          <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h4 className="text-white font-semibold mb-2">¡Cliente de correo abierto!</h4>
          <p className="text-gray-300 text-sm">
            Se ha abierto tu cliente de correo predeterminado con el mensaje prellenado.
            Solo presiona "Enviar" en tu cliente de correo.
          </p>
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
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
          required
        />

        <textarea
          name="message"
          placeholder="Tu mensaje"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none"
          required
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center space-x-2 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-medium"
        >
          <Send size={16} />
          <span>Enviar por correo</span>
        </motion.button>
      </motion.form>
      
      <p className="text-gray-400 text-xs mt-2 text-center">
        Se abrirá tu cliente de correo predeterminado
      </p>
    </div>
  );
};

export default SimpleContactForm;