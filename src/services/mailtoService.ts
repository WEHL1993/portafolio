import type { ContactFormData } from './emailService';

export const sendMailtoLink = (formData: ContactFormData): void => {
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
};