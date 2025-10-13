/// <reference types="vite/client" />

// Definición de tipos para variables de entorno de Vite
interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  // Aquí puedes añadir más variables de entorno cuando las necesites
  readonly [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}