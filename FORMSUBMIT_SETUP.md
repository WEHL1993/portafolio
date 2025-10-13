# Configuración de FormSubmit para el formulario de contacto

## 🚀 Cómo funciona FormSubmit

FormSubmit es un servicio que te permite enviar formularios HTML directamente a tu correo electrónico, sin necesidad de configurar un backend ni crear cuentas. Es perfecto para portafolios personales y sitios pequeños.

## ✨ Ventajas de FormSubmit

- **Sin registro necesario** - Solo necesitas tu dirección de correo
- **Sin backend** - Todo funciona mediante HTML y el servicio de FormSubmit
- **Captcha opcional** - Puedes habilitarlo o deshabilitarlo
- **Personalizable** - Puedes configurar el asunto, plantilla y más
- **Gratis** - Completamente gratuito para uso básico

## 📋 Cómo está configurado en el proyecto

El componente `FormSubmitContact` está listo para usar y ya integra FormSubmit. Lo puedes encontrar en:
```
src/components/FormSubmitContact.tsx
```

## 🔧 Para usar el componente:

```tsx
import FormSubmitContact from './components/FormSubmitContact';

// En tu componente:
<FormSubmitContact 
  recipientEmail="tu_correo@gmail.com" 
  subjectPrefix="Mensaje desde mi sitio"
/>
```

## ⚙️ Propiedades que puedes configurar:

- **recipientEmail**: El correo donde recibirás los mensajes (obligatorio)
- **subjectPrefix**: Texto que aparecerá al inicio del asunto del correo
- **className**: Clases CSS adicionales para el contenedor
- **onSuccess**: Función callback que se ejecuta cuando el mensaje se envía correctamente

## 👉 Primera vez que usas FormSubmit:

La primera vez que alguien envíe un formulario desde tu sitio, recibirás un correo de confirmación de FormSubmit. Deberás hacer clic en el enlace de confirmación para activar el servicio para tu correo. Este paso es obligatorio y es una medida de seguridad.

## 🔒 Seguridad:

- FormSubmit utiliza la dirección de correo electrónico directamente en la acción del formulario.
- Para evitar spam, implementa captcha o utiliza verificación por email.
- No necesitas preocuparte por exponer tu API key porque FormSubmit no utiliza API keys.

## 📝 Opciones adicionales de FormSubmit:

El componente ya incluye estas configuraciones, pero puedes modificarlas:

- **_subject**: Personaliza el asunto del correo
- **_template**: Estilo de la plantilla (box, table, basic)
- **_captcha**: Habilitar/deshabilitar captcha
- **_next**: URL de redirección después del envío

Para más información, visita [FormSubmit.co](https://formsubmit.co/)