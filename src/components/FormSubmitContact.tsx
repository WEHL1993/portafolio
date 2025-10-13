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
interface FormSubmitContactProps {
  recipientEmail?: string; // Email de destino configurable
  subjectPrefix?: string;  // Prefijo personalizado para el asunto
  className?: string;      // Clases adicionales para el contenedor
  onSuccess?: () => void;  // Callback para cuando el formulario se envía correctamente
}

/**
 * Componente de formulario de contacto que utiliza FormSubmit para enviar emails
 * sin necesidad de backend propio.
 */
const FormSubmitContact: React.FC<FormSubmitContactProps> = ({
  recipientEmail = "wilsoneduardohl@gmail.com",
  subjectPrefix = "Mensaje desde Portafolio",
  className = "",
  onSuccess
}) => {
  // Estados del formulario
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  // Manejador de validación del formulario (sin prevenir el envío)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenimos el envío tradicional
    setSubmitError(null);

    // Solo validamos, si no es válido detenemos el proceso
    if (!validateForm()) {
      return;
    }

    // Si llegamos aquí, el formulario es válido
    setIsSubmitting(true);
    
    // Enviamos el formulario manualmente
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    fetch(`https://formsubmit.co/${recipientEmail}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true); // Mostrar página de agradecimiento
        
        // Si se proporcionó un callback de éxito, lo ejecutamos
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setIsSubmitting(false);
        setSubmitError('Error al enviar el formulario. Por favor intenta nuevamente.');
        console.error('Error al enviar el formulario:', response.statusText);
      }
    })
    .catch(error => {
      setIsSubmitting(false);
      setSubmitError('Error al enviar el formulario. Por favor intenta nuevamente.');
      console.error('Error al enviar el formulario:', error);
    });
  };

  // Resetear el formulario
  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError(null);
  };

  // Renderizado del mensaje de éxito
  if (isSubmitted) {
    return <ThankYouPage onSendAnother={resetForm} />;
  }

  return (
    <div className={`${className} mt-8`}>
      <h4 className="text-white font-semibold mb-4">Mensaje rápido</h4>
      
      <form 
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        {/* Campos ocultos para configuración de FormSubmit */}
        <input type="hidden" name="_subject" value={`${subjectPrefix} - De: ${formData.name}`} />
        <input type="hidden" name="_template" value="box" />
        <input type="hidden" name="_captcha" value="false" />
        
        {/* Campo de nombre */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-gray-800 border ${
              errors.name ? 'border-red-500' : 'border-gray-700'
            } rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors`}
            disabled={isSubmitting}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Campo de email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-gray-800 border ${
              errors.email ? 'border-red-500' : 'border-gray-700'
            } rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors`}
            disabled={isSubmitting}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Campo de mensaje */}
        <div>
          <textarea
            name="message"
            placeholder="Tu mensaje"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className={`w-full bg-gray-800 border ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            } rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors resize-none`}
            disabled={isSubmitting}
            required
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        {/* Error de envío */}
        {submitError && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{submitError}</span>
          </div>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isSubmitting}
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
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Enviar</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default FormSubmitContact;