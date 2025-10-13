import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import ThankYouPage from './ThankYouPage';

// Interface para el tipo de formulario
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Interface para errores de validación
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Props del componente
interface DirectFormSubmitProps {
  recipientEmail: string; // Email de destino configurable
  subjectPrefix?: string; // Prefijo personalizado para el asunto
  className?: string;     // Clases adicionales para el contenedor
}

/**
 * Componente de formulario de contacto que utiliza FormSubmit para enviar emails
 * sin necesidad de backend propio.
 */
const DirectFormSubmit: React.FC<DirectFormSubmitProps> = ({
  recipientEmail,
  subjectPrefix = "Mensaje desde Portafolio",
  className = ""
}) => {
  // Estados del formulario
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validación de campos individuales
  const validateField = (name: keyof ContactFormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return !value.trim() ? 'El nombre es requerido' : undefined;
      case 'email':
        return !value.trim() 
          ? 'El email es requerido' 
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? 'El formato de email no es válido'
            : undefined;
      case 'message':
        return !value.trim() ? 'El mensaje es requerido' : undefined;
      default:
        return undefined;
    }
  };

  // Validación completa del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validar cada campo
    Object.entries(formData).forEach(([key, value]) => {
      const fieldName = key as keyof ContactFormData;
      const error = validateField(fieldName, value);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Manejador de cambios en los campos
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    
    // Actualizar datos del formulario
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validación en tiempo real
    const fieldError = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Manejador de validación antes del envío
  // Estados para manejar la carga
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenimos el envío tradicional

    // Validamos el formulario
    if (!validateForm()) {
      return; // Si hay errores, detenemos aquí
    }

    // Activar estado de carga inmediatamente
    setIsLoading(true);

    // Importante: Mostrar inmediatamente la página de agradecimiento
    // para dar feedback instantáneo al usuario
    setTimeout(() => {
      setIsSubmitted(true);
    }, 300); // Un pequeño delay para que se vea natural

    // Si el formulario es válido, enviamos los datos en segundo plano
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    // Agregar un parámetro aleatorio para evitar cachés
    const timestamp = new Date().getTime();
    formData.append('_nocache', timestamp.toString());
    
    // Enviar datos en segundo plano con navegador en modo no bloqueante
    const sendInBackground = async () => {
      try {
        const response = await fetch(`https://formsubmit.co/${recipientEmail}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store'
          }
        });
        
        if (!response.ok) {
          console.error('Error al enviar el formulario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Ejecutar en segundo plano
    sendInBackground();
  };
  
  // Función para resetear el formulario y volver a mostrar el formulario
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // Si el formulario ha sido enviado, mostrar la página de agradecimiento
  if (isSubmitted) {
    return <ThankYouPage onSendAnother={resetForm} />;
  }

  return (
    <div className={`${className}`}>
      <form 
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Campos ocultos para configuración de FormSubmit */}
        <input type="hidden" name="_subject" value={`${subjectPrefix} - De: ${formData.name}`} />
        <input type="hidden" name="_template" value="box" />
        <input type="hidden" name="_captcha" value="false" />
        
        {/* Campo de nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-gray-800 border ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            } rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors`}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Campo de email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Tu email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-gray-800 border ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            } rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Campo de mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tu mensaje"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`w-full bg-gray-800 border ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            } rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none`}
            required
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full ${isLoading ? 'bg-red-700' : 'bg-red-600 hover:bg-red-500'} text-white py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 font-medium text-base hover:shadow-xl`}
          style={{ background: isLoading ? '#cc0000' : '#ff0000' }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Enviar mensaje</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default DirectFormSubmit;