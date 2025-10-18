
# Portafolio — Wilson Hernández

Sitio web personal construido con React, TypeScript y Vite para mostrar proyectos, certificados, investigación y formas de contacto.

Este repositorio contiene el código fuente del portafolio, configurado con soporte para i18n (es/en), animaciones (Framer Motion) y un formulario de contacto funcional (EmailJS).

---

## Contenido

- Descripción
- Requisitos
- Instalación
- Variables de entorno
- Comandos útiles
- Estructura del proyecto
- Cómo contribuir
- Contacto

---

## Descripción

Este portafolio muestra ejemplos de proyectos personales, certificaciones, una pequeña investigación sobre Hooks de React y un formulario de contacto. Es responsive y optimizado para una experiencia fluida en escritorio y móvil.

## Requisitos

- Node.js >= 20
- npm (recomendado) o yarn

## Instalación

1. Clona el repositorio:

```powershell
git clone https://github.com/WEHL1993/portafolio.git
cd portafolio
```

2. Instala dependencias:

```powershell
npm install
```

3. (Opcional) Instala Tailwind si no está presente globalmente en tu entorno del proyecto:

```powershell
npm install tailwindcss @tailwindcss/vite
```

4. Crear el archivo de variables de entorno:

- Crea un archivo `.env` en la raíz del proyecto (puedes basarte en un `.env.example` si existe).
- Añade las variables necesarias (ejemplo mínimo abajo).

## Variables de entorno (ejemplo)

Agregar en `.env` (no subir este archivo a un repositorio público):

```text
# EmailJS
VITE_EMAILJS_PUBLIC_KEY=tu_clave_publica

# (otros valores si aplica)
```

Para detalles sobre la configuración del formulario revisa `EMAIL_SETUP.md` y `SETUP_CORREOS.md` en la raíz del proyecto.

## Scripts disponibles

Los scripts definidos en `package.json` son:

- `npm run dev` — Inicia el servidor de desarrollo (Vite).
- `npm run build` — Compila TypeScript y genera la build de producción (Vite).
- `npm run preview` — Sirve la build generada para previsualizar.
- `npm run lint` — Ejecuta ESLint en el proyecto.

## Cómo ejecutar

Desarrollo:

```powershell
npm run dev
```

Build de producción:

```powershell
npm run build
```

Previsualizar build:

```powershell
npm run preview
```

---

## Estructura del proyecto (resumen)

Raíz del proyecto:

- `public/` — Archivos estáticos servidos tal cual.
- `src/` — Código fuente.
  - `assets/` — Imágenes y recursos.
  - `components/` — Componentes React (Projects, Certificates, Hooks, etc.).
  - `i18n/` — Configuración y ficheros de traducción (es/en).
  - `services/` — Lógica de servicios (ej.: emailService).
  - `data/` — Datos estáticos (proyectos, skills, certificados).
- `package.json` — Scripts y dependencias.
- `vite.config.ts` — Configuración de Vite.

Explora el árbol para ver los archivos concretos; está organizado para ser fácil de mantener.

---

## Notas de implementación importantes

- Las imágenes de las cards en `Projects` ahora se seleccionan por `id` para evitar problemas cuando se cambian los títulos traducidos.
- Al navegar desde una card (Projects o Certificates) el componente guarda la última card visitada en `sessionStorage` y, al volver, hace scroll a la card para mantener el contexto.

---

## Contribuir

Si quieres ayudar o contribuir con mejoras:

1. Haz un fork del repositorio.
2. Crea una rama con tu feature: `git checkout -b feature/nombre`.
3. Realiza tus cambios y agrega tests si aplica.
4. Envía un pull request describiendo los cambios.

Por favor sigue el estilo de código (TypeScript + ESLint) y ejecuta `npm run lint` antes de abrir el PR.

---

## Problemas comunes / Troubleshooting

- Error al ejecutar `npm run dev`:
  - Asegúrate de tener Node 20+.
  - Ejecuta `npm install` para instalar dependencias.

- Formulario de contacto no envía correos:
  - Revisa `EMAIL_SETUP.md` y `SETUP_CORREOS.md`.
  - Verifica que `VITE_EMAILJS_PUBLIC_KEY` y los IDs en `src/services/emailService.ts` estén configurados.


## Contacto

- Autor: Wilson Hernández
- Email: wilsoneduardohl@gmail.com

Si necesitas ayuda con la configuración o quieres colaborar, abre un issue o envíame un correo.
