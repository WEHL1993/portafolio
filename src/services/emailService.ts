// Este archivo se ha mantenido para evitar errores de importación
// pero toda la funcionalidad EmailJS ha sido eliminada.
// Si necesitas enviar correos, usa el componente DirectFormSubmit que utiliza FormSubmit.

// Configuración mínima para evitar errores
export const EMAIL_CONFIG = {
  serviceId: '',
  templateId: '',
  publicKey: ''
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Función de envío de email desactivada
// Esta función permanece para mantener compatibilidad con código existente
export const sendContactEmail = async (/* formData: ContactFormData */): Promise<boolean> => {
  console.warn('La funcionalidad EmailJS ha sido deshabilitada.');
  console.log('Para enviar correos, usa el componente DirectFormSubmit que utiliza FormSubmit.');
  return false;
};