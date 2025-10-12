import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useScrollToTop } from '../hooks/useScrollToTop';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { showScrollTop, scrollToTop } = useScrollToTop();

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/wilson-hernandez', color: 'text-blue-400 hover:text-blue-300' },
    { icon: Github, href: 'https://github.com/wilson-hernandez', color: 'text-gray-400 hover:text-gray-300' },
    { icon: Instagram, href: 'https://instagram.com/wilson.hernandez', color: 'text-pink-400 hover:text-pink-300' },
    { icon: Twitter, href: 'https://twitter.com/wilson_dev', color: 'text-sky-400 hover:text-sky-300' },
    { icon: Youtube, href: 'https://youtube.com/@wilsonhernandez', color: 'text-red-400 hover:text-red-300' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'wilsoneduardohl@gmail.com', href: 'mailto:wilsoneduardohl@gmail.com' },
    { icon: Phone, text: '54316741', href: 'tel:54316741' },
    { icon: MapPin, text: 'Guazacapán, Santa Rosa', href: '#' }
  ];

  return (
    <footer className="w-full bg-gradient-to-t from-black via-red-950 to-red-900 border-t border-red-700/20 overflow-x-hidden">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xl border-2 border-red-400">
                WH
              </div>
              <span className="text-white font-semibold text-xl">
                Wilson Hernández
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Desarrollador Front-end apasionado por crear experiencias web modernas 
              y funcionales. Siempre buscando nuevos desafíos y oportunidades de crecimiento.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} transition-colors duration-200`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-xl font-bold mb-6">Contacto</h3>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-red-300 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <contact.icon size={20} className="text-red-400 group-hover:text-red-300" />
                  <span>{contact.text}</span>
                </motion.a>
              ))}
            </div>

            {/* Quick Contact Form */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Mensaje rápido</h4>
              <form 
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const email = formData.get('email') as string;
                  const message = formData.get('message') as string;
                  
                  const subject = `Mensaje desde el portafolio - ${name}`;
                  const body = `Hola Wilson,\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}\n\n---\nEste mensaje fue enviado desde tu portafolio web.`;
                  
                  window.location.href = `mailto:wilsoneduardohl@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Tu mensaje"
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors font-medium"
                >
                  Enviar
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white text-xl font-bold mb-6">Navegación</h3>
            <div className="grid grid-cols-2 gap-3">
              {['about', 'projects', 'skills', 'certificates', 'contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className="text-gray-300 hover:text-red-300 transition-colors capitalize"
                  whileHover={{ x: 5 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(`#${item}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {t(`nav.${item}`)}
                </motion.a>
              ))}
            </div>

            {/* Skills Tags */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js'].map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-red-900/30 border border-red-700/50 text-red-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-red-700/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Hecho con ❤️ y React</span>
            <span>•</span>
            <span>A.C. Milan Fan 🔴⚫</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
          title={t('footer.scrollTop')}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
