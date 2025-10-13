// src/tests/emailService.test.ts
import { EMAIL_CONFIG } from '../services/emailService';

// Tipo para el resultado de la verificación de configuración
export interface EmailConfigStatus {
  serviceConfigured: boolean;
  templateConfigured: boolean;
  apiKeyConfigured: boolean;
}

// Una función simple para probar la configuración
export const testEmailConfig = (): EmailConfigStatus => {
  console.log('==== Configuración de EmailJS ====');
  console.log('ServiceID:', EMAIL_CONFIG.serviceId);
  console.log('TemplateID:', EMAIL_CONFIG.templateId);
  console.log('Public Key configurada:', EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY');
  
  if (EMAIL_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('⚠️ No se ha configurado la clave API de EmailJS. El formulario de contacto no funcionará correctamente.');
    console.log('Por favor, configura la variable VITE_EMAILJS_PUBLIC_KEY en el archivo .env');
    console.log('Para más información, consulta EMAIL_SETUP.md');
  } else {
    console.log('✅ La clave API de EmailJS está configurada correctamente.');
  }
  
  // Comprobaciones más precisas
  const serviceConfigured: boolean = !!EMAIL_CONFIG.serviceId && 
                                     EMAIL_CONFIG.serviceId !== 'tu_service_id_aqui' && 
                                     EMAIL_CONFIG.serviceId.startsWith('service_');
  
  const templateConfigured: boolean = !!EMAIL_CONFIG.templateId && 
                                      EMAIL_CONFIG.templateId !== 'tu_template_id_aqui' && 
                                      EMAIL_CONFIG.templateId.startsWith('template_');
  
  const apiKeyConfigured: boolean = !!EMAIL_CONFIG.publicKey && 
                                   EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY' && 
                                   EMAIL_CONFIG.publicKey !== '';
  
  console.log('Service configurado:', serviceConfigured);
  console.log('Template configurado:', templateConfigured);
  console.log('API Key configurada:', apiKeyConfigured);
  
  return {
    serviceConfigured,
    templateConfigured,
    apiKeyConfigured
  };
};

// Exportamos la función para poder utilizarla desde el componente ContactForm si es necesario
export default testEmailConfig;