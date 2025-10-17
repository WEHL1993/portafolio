// Este archivo se ha mantenido para evitar errores de importación
// pero toda la funcionalidad EmailJS ha sido eliminada.
// Si necesitas enviar correos, usa el componente DirectFormSubmit que utiliza FormSubmit.
import emailjs from '@emailjs/browser';

// Tipos para los datos del formulario
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Leer variables de entorno (definidas en Vite como VITE_...)

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

/**
 * Envía el formulario usando EmailJS.
 * Acepta tanto un HTMLFormElement (para usar sendForm) como un objeto con los datos.
 * Devuelve true si el envío fue exitoso, false en caso contrario.
 */
export const sendContactEmail = async (form: HTMLFormElement | ContactFormData): Promise<boolean> => {
  // Si faltan credenciales, abortar y devolver false
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS no está configurado. Define VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID y VITE_EMAILJS_PUBLIC_KEY.');
    return false;
  }

    try {
    // Inicializar EmailJS con la clave pública (puede llamarse varias veces sin problema)
    emailjs.init(PUBLIC_KEY);

    // Helper para enviar y reintentar con prefijo 'user_' si necesario
    const trySend = async (params: Record<string, unknown>, keyToUse: string) => {
      emailjs.init(keyToUse);
      return await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, keyToUse);
    };

    // Si recibimos un elemento form, extraer los valores y usar send con templateParams
    if (form instanceof HTMLFormElement) {
      const fd = new FormData(form as HTMLFormElement);
      // Soportar varios nombres de campos que la plantilla pueda esperar
      const from_name = String(fd.get('from_name') || fd.get('name') || '');
      const from_email = String(fd.get('from_email') || fd.get('email') || '');
      const message = String(fd.get('message') || fd.get('msg') || '');
      const subject = String(fd.get('_subject') || fd.get('subject') || '');

      const templateParams = {
        from_name,
        from_email,
        name: from_name,      // compatibilidad con plantilla que usa {{name}}
        email: from_email,    // compatibilidad con plantilla que usa {{email}}
        message,
        reply_to: from_email,
        subject,
        time: new Date().toLocaleString()
      };

      try {
        const result = await trySend(templateParams, PUBLIC_KEY);
        console.log('EmailJS send (from form) result:', result.status, result.text, templateParams);
        return result.status >= 200 && result.status < 300;
      } catch (err: unknown) {
  const msg = (err && typeof err === 'object' && 'text' in err) ? String((err as { text?: unknown }).text) : String(err);
        console.warn('EmailJS first attempt failed:', msg);
        // Si el error indica cuenta no encontrada, intentar con 'user_' prefijo si no existe
        if (!PUBLIC_KEY.startsWith('user_') && String(msg).toLowerCase().includes('account not found')) {
          const altKey = `user_${PUBLIC_KEY}`;
          try {
            const result2 = await trySend(templateParams, altKey);
            console.log('EmailJS retry with user_ prefix result:', result2.status, result2.text, templateParams);
            return (result2.status >= 200 && result2.status < 300);
          } catch (err2: unknown) {
            const msg2 = (err2 && typeof err2 === 'object' && 'text' in err2) ? String((err2 as { text?: unknown }).text) : String(err2);
            console.error('EmailJS retry also failed:', msg2);
            throw err2;
          }
        }
        throw err;
      }
    }

    // Si recibimos un objeto con datos, usamos send para enviar los params directamente
    const data = form as ContactFormData;
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      name: data.name,
      email: data.email,
      message: data.message,
      reply_to: data.email,
      time: new Date().toLocaleString()
    };

    try {
      const result = await trySend(templateParams, PUBLIC_KEY);
      console.log('EmailJS send result:', result.status, result.text, templateParams);
      return result.status >= 200 && result.status < 300;
    } catch (err: unknown) {
  const msg = (err && typeof err === 'object' && 'text' in err) ? String((err as { text?: unknown }).text) : String(err);
      console.warn('EmailJS first attempt failed:', msg);
      if (!PUBLIC_KEY.startsWith('user_') && String(msg).toLowerCase().includes('account not found')) {
        const altKey = `user_${PUBLIC_KEY}`;
        try {
          const result2 = await trySend(templateParams, altKey);
          console.log('EmailJS retry with user_ prefix result:', result2.status, result2.text, templateParams);
          return (result2.status >= 200 && result2.status < 300);
        } catch (err2: unknown) {
          const msg2 = (err2 && typeof err2 === 'object' && 'text' in err2) ? String((err2 as { text?: unknown }).text) : String(err2);
          console.error('EmailJS retry also failed:', msg2);
          throw err2;
        }
      }
      throw err;
    }
  } catch (error) {
    console.error('Error enviando email con EmailJS:', error);
    return false;
  }
};