import emailjs from '@emailjs/browser';

// Configuración de EmailJS
export const EMAIL_CONFIG = {
  serviceId: 'service_portfolio', // Reemplaza con tu Service ID
  templateId: 'template_contact', // Reemplaza con tu Template ID
  publicKey: 'YOUR_PUBLIC_KEY' // Reemplaza con tu Public Key
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'wilsoneduardohl@gmail.com', // Tu correo de destino
      reply_to: formData.email
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams,
      EMAIL_CONFIG.publicKey
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};