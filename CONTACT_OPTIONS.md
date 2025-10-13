# Opciones de Formulario de Contacto

Este proyecto incluye dos opciones diferentes para implementar el formulario de contacto, cada una con sus propias ventajas y casos de uso.

## Opción 1: Formulario con FormSubmit (Recomendado para simplicidad)

El componente `FormSubmitContact` utiliza [FormSubmit](https://formsubmit.co/), un servicio que permite enviar formularios HTML directamente a tu correo electrónico sin necesidad de backend ni configuraciones complicadas.

### Ventajas:
- No requiere registro ni API keys
- Configuración mínima
- No requiere backend
- Funciona inmediatamente después de la primera confirmación

### Desventajas:
- Menos control sobre el formato del correo
- La primera vez que se usa requiere verificación por email

### Cómo usar:
```tsx
<FormSubmitContact 
  recipientEmail="wilsoneduardohl@gmail.com" 
  subjectPrefix="Mensaje desde Portafolio"
/>
```

### Documentación:
Ver archivo [FORMSUBMIT_SETUP.md](./FORMSUBMIT_SETUP.md) para más detalles sobre configuración.

## Opción 2: Formulario con EmailJS

El componente `ContactForm` utiliza [EmailJS](https://www.emailjs.com/), un servicio más completo para envío de correos desde el frontend.

### Ventajas:
- Mayor control sobre el formato y diseño del correo
- Más opciones de personalización
- Estadísticas de envío
- No abre el cliente de correo del usuario

### Desventajas:
- Requiere registro y configuración de API keys
- Límite de 200 correos/mes en la versión gratuita

### Cómo usar:
```tsx
<ContactForm />
```

### Documentación:
Ver archivo [EMAIL_SETUP.md](./EMAIL_SETUP.md) para más detalles sobre configuración.

## ¿Cuál elegir?

- **FormSubmit** es ideal para proyectos pequeños o cuando quieres una solución rápida sin configuración.
- **EmailJS** es mejor para proyectos más profesionales donde necesitas más control sobre el formato y seguimiento de correos.

En el modo de desarrollo, puedes alternar entre ambas opciones usando el botón que aparece antes de la sección de contacto.

Para el sitio en producción, modifica `layout.tsx` y elige uno de los componentes para utilizarlo permanentemente.