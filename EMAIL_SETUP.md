# Configuración de EmailJS para el Portafolio

## 🚀 Configuración de EmailJS para Envío de Correos

Para que el formulario de contacto funcione y envíe correos reales a tu email `wilsoneduardohl@gmail.com`, sigue estos pasos:

### 1. 📧 Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate con tu email
3. Confirma tu cuenta

### 2. 🔧 Configurar el Servicio

1. En tu dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email:
   - **Gmail** (recomendado para `wilsoneduardohl@gmail.com`)
   - Outlook, Yahoo, etc.
4. Conecta tu cuenta de Gmail
5. Copia el **Service ID** (ejemplo: `service_abc123`)

### 3. 📝 Crear Template

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa este contenido:

**Subject:** `Nuevo mensaje desde tu portafolio`

**Content:**
```
Hola Wilson,

Has recibido un nuevo mensaje desde tu portafolio web:

De: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portafolio web.
```

4. Copia el **Template ID** (ejemplo: `template_xyz789`)

### 4. 🔑 Obtener Public Key

1. Ve a **"Account" > "General"**
2. Copia tu **Public Key** (ejemplo: `user_abc123xyz`)

### 5. 💻 Actualizar la Configuración

Edita el archivo `src/services/emailService.ts` y reemplaza:

```typescript
export const EMAIL_CONFIG = {
  serviceId: 'tu_service_id_aqui',     // Reemplaza
  templateId: 'tu_template_id_aqui',   // Reemplaza  
  publicKey: 'tu_public_key_aqui'      // Reemplaza
};
```

### 6. ✅ Probar el Formulario

1. Guarda los cambios
2. Recarga tu portafolio
3. Llena el formulario de contacto
4. ¡Deberías recibir el correo en `wilsoneduardohl@gmail.com`!

## 🛠️ Alternativas sin Registro

Si prefieres no usar EmailJS, puedes:

### Opción 1: Formspree (Más simple)
1. Ve a [https://formspree.io/](https://formspree.io/)
2. Crea una cuenta gratuita
3. Genera un endpoint
4. Cambia el formulario para usar POST a ese endpoint

### Opción 2: Netlify Forms (Si usas Netlify)
1. Agrega `data-netlify="true"` al formulario
2. Netlify manejará automáticamente los envíos

### Opción 3: Simple mailto (Básico)
El botón ya existente de email abre el cliente de correo del usuario.

## 📞 Configuración Actual

- **Email destino:** `wilsoneduardohl@gmail.com`
- **Teléfono:** `54316741`
- **Ubicación:** `Guazacapán, Santa Rosa`

¡Con esto tu formulario de contacto estará completamente funcional! 🎉