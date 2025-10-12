# 🚀 Portafolio Personal - Wilson Hernández

Un portafolio web personal moderno y responsivo construido con las últimas tecnologías front-end.

## 🛠️ Stack Tecnológico

### Core Framework
- **React 19.1.0** - Biblioteca principal para UI
- **TypeScript 5.8.3** - Tipado estático
- **Vite 7.0.4** - Build tool y servidor de desarrollo

### Styling & UI
- **Tailwind CSS 4.1.14** - Framework CSS utilitario
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos

### Calidad de Código
- **ESLint 9.30.1** - Linting y análisis de código
- **TypeScript ESLint** - Reglas específicas para TypeScript

### Funcionalidades
- **React i18next** - Internacionalización (ES/EN)
- **Typed.js** - Animaciones de texto tipo máquina de escribir
- **Baffle.js** - Efectos de texto animado
- **React Intersection Observer** - Detección de elementos visibles

## 🏗️ Estructura del Proyecto

```
portafolio/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Header.tsx       # Navegación y menú
│   │   ├── HeroSection.tsx  # Sección principal
│   │   ├── AboutMe.tsx      # Sección "Sobre mí"
│   │   ├── Projects.tsx     # Galería de proyectos
│   │   ├── Skills.tsx       # Habilidades técnicas
│   │   ├── Certificates.tsx # Certificados
│   │   └── Footer.tsx       # Pie de página
│   ├── hooks/               # Hooks personalizados
│   │   ├── useBaffle.ts     # Hook para efectos de texto
│   │   ├── useTyped.ts      # Hook para texto animado
│   │   └── useScrollToTop.ts # Hook para scroll
│   ├── i18n/                # Configuración de idiomas
│   │   ├── index.ts         # Configuración i18n
│   │   └── locales/         # Archivos de traducción
│   │       ├── es.json      # Español
│   │       └── en.json      # Inglés
│   ├── layout/              # Layouts principales
│   │   └── layout.tsx       # Layout base
│   ├── types/               # Definiciones TypeScript
│   │   └── baffle.d.ts      # Tipos para librerías
│   ├── utils/               # Utilidades
│   │   └── index.ts         # Funciones auxiliares
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── public/
│   └── images/              # Imágenes estáticas
├── package.json             # Dependencias
├── vite.config.ts           # Configuración Vite
├── tsconfig.json            # Configuración TypeScript
└── eslint.config.js         # Configuración ESLint
```

## ✨ Características Principales

### 🎨 Diseño y UX
- **Diseño responsivo** completo para todos los dispositivos
- **Paleta de colores** inspirada en A.C. Milan (rojo y negro)
- **Animaciones fluidas** con Framer Motion
- **Efectos de texto** únicos con Baffle.js y Typed.js
- **Smooth scrolling** entre secciones

### 🌐 Funcionalidades
- **Selector de idiomas** (Español/Inglés) con banderas
- **Menú hamburguesa** para móviles
- **Tarjetas expandibles** en la sección de habilidades
- **Lightbox** para certificados
- **Botón scroll to top** dinámico
- **Terminal simulado** en la sección "Sobre mí"

### 🎯 Secciones
1. **Header/Navegación** - Menú sticky con logo y selector de idiomas
2. **Hero Section** - Presentación principal con efectos de texto
3. **Sobre Mí** - Terminal interactivo con información personal
4. **Proyectos** - Galería de 4 proyectos con tecnologías
5. **Habilidades** - Tarjetas expandibles con descripciones detalladas
6. **Certificados** - Galería con lightbox de certificaciones
7. **Footer** - Enlaces sociales y formulario de contacto

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/WEHL1993/portafolio.git

# Navegar al directorio
cd portafolio

# Instalar dependencias
npm install
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Construcción
npm run build        # Construye para producción

# Vista previa
npm run preview      # Previsualiza build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 📦 Dependencias

### Stack Tecnológico Completo

**Frontend Framework:**
- React 19.1.0
- TypeScript 5.8.3
- Vite 7.0.4

**Styling:**
- Tailwind CSS 4.1.14
- @tailwindcss/vite 4.1.14

**Animaciones y Efectos:**
- framer-motion
- baffle
- typed.js

**Utilidades:**
- react-i18next + i18next (internacionalización)
- react-intersection-observer
- lucide-react (iconos)

**Calidad de Código:**
- ESLint 9.30.1
- @eslint/js 9.30.1
- typescript-eslint 8.35.1
- eslint-plugin-react-hooks 5.2.0
- eslint-plugin-react-refresh 0.4.20

## 🎨 Personalización

### Cambiar Colores del Tema
Modifica los colores en `src/components/` usando las clases de Tailwind:
- `bg-red-900` → Color de fondo principal
- `text-red-400` → Color de texto de acento
- `border-red-700` → Color de bordes

### Agregar Nuevos Idiomas
1. Crear archivo en `src/i18n/locales/nuevo-idioma.json`
2. Importar en `src/i18n/index.ts`
3. Agregar botón en `Header.tsx`

### Personalizar Contenido
Edita los archivos JSON en `src/i18n/locales/` para cambiar:
- Información personal
- Proyectos
- Habilidades
- Certificados

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
npm run build
npx vercel --prod
```

### Netlify
1. `npm run build`
2. Subir carpeta `dist` a Netlify

### GitHub Pages
1. Configurar GitHub Actions
2. Build automático en cada push

## 📱 Responsive Design

- **Mobile**: 0-640px
- **Tablet**: 640-1024px  
- **Desktop**: 1024px+

## 👤 Autor

**Wilson Hernández**
- GitHub: [@WEHL1993](https://github.com/WEHL1993)
- Portfolio: En desarrollo 🚧

## 📝 Comandos Útiles

```bash
# Instalar dependencias adicionales
npm install framer-motion react-intersection-observer typed.js baffle react-i18next i18next lucide-react --force

# Linting
npm run lint

# Build para producción
npm run build

# Preview del build
npm run preview
```

## ✅ Características Implementadas

✅ **Estructura completa del proyecto**  
✅ **Configuración de Vite + TypeScript + Tailwind**  
✅ **Sistema de internacionalización (ES/EN)**  
✅ **Componentes React modulares**  
✅ **Animaciones con Framer Motion**  
✅ **Efectos de texto (Baffle + Typed.js)**  
✅ **Diseño responsivo completo**  
✅ **Hooks personalizados**  
✅ **Configuración ESLint estricta**  
✅ **Paleta de colores A.C. Milan**  

## 🚀 Próximos Pasos

1. **Agregar imágenes reales** en `/public/images/`
2. **Configurar formulario de contacto** funcional
3. **Optimizar SEO** con meta tags
4. **Agregar tests** con Vitest
5. **Implementar PWA** features
6. **Configurar CI/CD** pipeline

---

⭐ **¡Proyecto listo para desarrollo!** ⭐

**URL Local**: http://localhost:5173/