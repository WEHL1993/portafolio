import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, MessageCircle } from 'lucide-react';
import DirectFormSubmit from './DirectFormSubmit';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="contact" className="w-full py-20 bg-gradient-to-b from-black to-red-950 overflow-x-hidden">
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
            {t('contact.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-red-900/10 border border-red-700/30 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {t('contact.getInTouch')}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('contact.description')}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Mail className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-400">wilsoneduardohl@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="text-white font-medium">{t('contact.location')}</h4>
                      <p className="text-gray-400">Guazacapán, Santa Rosa</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageCircle className="text-red-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="text-white font-medium">{t('contact.social')}</h4>
                      <div className="flex space-x-4 mt-2">
                        <motion.a 
                          href="https://linkedin.com/in/wilson-hernandez" 
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -3 }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          LinkedIn
                        </motion.a>
                        <motion.a 
                          href="https://github.com/WEHL1993" 
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -3 }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          GitHub
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-red-900/10 border border-red-700/30 rounded-lg p-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {t('contact.sendMessage')}
              </h3>
              <DirectFormSubmit recipientEmail="wilsoneduardohl@gmail.com" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;