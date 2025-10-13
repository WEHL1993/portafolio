import { useState } from 'react';
import { sendMailtoLink } from '../services/mailtoService';
import type { ContactFormData } from '../services/emailService';

interface UseContactFormReturn {
  formData: ContactFormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (error) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return false;
    }
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('El email no es válido');
      return false;
    }
    if (!formData.message.trim()) {
      setError('El mensaje es requerido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Usando el método de correo mailto para el envío de formulario');
      
      // Usar el método de mailto: link
      try {
        sendMailtoLink(formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } catch (mailtoError) {
        console.error('Error al abrir el cliente de correo:', mailtoError);
        setError('Error al abrir el cliente de correo. Intenta contactar directamente a wilsoneduardohl@gmail.com');
      }
    } catch (err) {
      console.error('Excepción capturada en el envío del formulario:', err);
      setError('Error de conexión. Intenta más tarde o contacta directamente a wilsoneduardohl@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
    setError(null);
  };

  return {
    formData,
    isSubmitting,
    isSubmitted,
    error,
    handleChange,
    handleSubmit,
    resetForm
  };
};