import { useEffect, useRef } from 'react';
import baffle from 'baffle';

export const useBaffle = (text: string, options?: { characters?: string; speed?: number }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const b = baffle(ref.current);
      
      b.set({
        characters: options?.characters || '█▓▒░ /<>',
        speed: options?.speed || 75
      }).start();

      // Reveal the text after a delay
      setTimeout(() => {
        b.reveal(1000);
      }, 500);

      return () => {
        b.stop();
      };
    }
  }, [text, options]);

  return ref;
};
