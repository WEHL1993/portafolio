# Portafolio Personal de Wilson Hernández

Mi portafolio web personal desarrollado con React, TypeScript y Vite.

## 🚀 Características

- Diseño responsive con Tailwind CSS
- Animaciones suaves con Framer Motion
- Soporte para múltiples idiomas (i18n)
- Formulario de contacto funcional (EmailJS)
- Optimizado para SEO

## 📋 Requisitos Previos

- Node.js 20.x o superior
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/WEHL1993/portafolio.git
   cd portafolio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`
   - Actualiza las variables con tus propias claves API

## ⚙️ Configuración del Formulario de Contacto

Para que el formulario de contacto envíe correos directamente a tu bandeja de entrada, sigue estos pasos:

1. **Consulta el archivo `SETUP_CORREOS.md`** para instrucciones detalladas paso a paso
2. Regístrate en [EmailJS](https://www.emailjs.com/) con tu correo `wilsoneduardohl@gmail.com`
3. Configura tu servicio de correo, plantilla y obtén tus credenciales
4. Actualiza el archivo `.env` con tu Public Key:
   ```
   VITE_EMAILJS_PUBLIC_KEY=tu_clave_publica_aqui
   ```
5. Actualiza los IDs en `src/services/emailService.ts`:
   ```typescript
   export const EMAIL_CONFIG = {
     serviceId: 'tu_service_id_aqui',
     templateId: 'tu_template_id_aqui',
     // ...
   };
     serviceId: 'tu_service_id_aqui',
     templateId: 'tu_template_id_aqui',
     publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
   };
   ```

Para más detalles, consulta el archivo [EMAIL_SETUP.md](./EMAIL_SETUP.md).

## 🚀 Ejecución

Inicia el servidor de desarrollo:
```bash
npm run dev
```

El sitio estará disponible en: `http://localhost:5173`

## 📦 Construcción para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist`.

## 🛠️ Tecnologías Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [i18next](https://www.i18next.com/)
- [EmailJS](https://www.emailjs.com/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles
```
