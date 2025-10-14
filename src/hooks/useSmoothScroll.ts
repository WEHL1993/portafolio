import { useEffect } from 'react';

// Este hook simula el comportamiento de Lenis para scroll suave
// En una implementación real, deberías instalar @studio-freight/lenis 
// y utilizar esa librería
export const useSmoothScroll = () => {
  useEffect(() => {
    // Esta es una implementación simplificada de scroll suave
    // que no requiere instalar Lenis
    const smoothScrollTo = (e: Event) => {
      if (!(e instanceof MouseEvent) || !(e.target instanceof HTMLAnchorElement)) return;
      const target = e.target;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    // Añadir evento click a enlaces internos
    document.addEventListener('click', smoothScrollTo);

    return () => {
      document.removeEventListener('click', smoothScrollTo);
    };
  }, []);
};

export default useSmoothScroll;