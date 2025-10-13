# Configuración para recibir correos del formulario de contacto

## Para asegurar que los correos lleguen a tu bandeja de entrada:

1. **Crea una cuenta en EmailJS**:
   - Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
   - Regístrate con tu correo `wilsoneduardohl@gmail.com`
   - Confirma tu cuenta vía el correo que te enviarán

2. **Configura un servicio de email**:
   - En el dashboard de EmailJS, ve a "Email Services"
   - Haz clic en "Add New Service"
   - Selecciona Gmail (u otro proveedor que uses)
   - Conecta con tu cuenta de correo `wilsoneduardohl@gmail.com`
   - Anota el **Service ID** que te asignen (algo como `service_abc123`)

3. **Crea una plantilla para los mensajes**:
   - Ve a "Email Templates"
   - Haz clic en "Create New Template"
   - Configúrala así:
     - **To Email**: `{{to_email}}` (se rellenará automáticamente con tu correo)
     - **From Name**: `{{from_name}}` (nombre de quien te contacta)
     - **From Email**: `{{from_email}}` (email de quien te contacta)
     - **Subject**: "Nuevo mensaje desde tu portafolio"
     - **Content**:
       ```
       Hola Wilson,
       
       Has recibido un mensaje desde tu portafolio:
       
       De: {{from_name}}
       Email: {{from_email}}
       
       Mensaje:
       {{message}}
       
       ---
       Este email fue enviado automáticamente desde tu formulario de contacto.
       ```
   - Guarda la plantilla y anota el **Template ID** (algo como `template_xyz789`)

4. **Obtén tu Public Key**:
   - Ve a "Account" > "API Keys"
   - Copia tu **Public Key** (algo como `user_abc123def456`)

5. **Actualiza tus archivos**:
   - Edita el archivo `.env` y añade tu Public Key:
     ```
     VITE_EMAILJS_PUBLIC_KEY=user_tu_clave_aquí
     ```
   - Edita el archivo `src/services/emailService.ts` y actualiza:
     ```typescript
     serviceId: 'service_tu_id_aquí',  
     templateId: 'template_tu_id_aquí',
     ```

6. **Reinicia el servidor** con `npm run dev`

7. **Prueba el formulario** enviando un mensaje de prueba

## Importante:
- EmailJS permite 200 correos gratis al mes
- Asegúrate de que tu cuenta de Gmail permita aplicaciones menos seguras o usa autenticación en dos pasos con contraseñas de aplicaciones
- Si los correos no llegan, revisa tu carpeta de spam