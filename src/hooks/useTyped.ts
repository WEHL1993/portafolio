import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface UseTypedOptions {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
  startDelay?: number;
  onComplete?: (self: Typed) => void;
}

export const useTyped = (options: UseTypedOptions) => {
  const ref = useRef<HTMLElement>(null);
  const typedRef = useRef<Typed | null>(null);

  useEffect(() => {
    if (ref.current) {
      typedRef.current = new Typed(ref.current, {
        strings: options.strings,
        typeSpeed: options.typeSpeed || 50,
        backSpeed: options.backSpeed || 30,
        loop: options.loop || false,
        showCursor: options.showCursor !== false,
        cursorChar: options.cursorChar || '|',
        startDelay: options.startDelay || 0,
        onComplete: options.onComplete
      });
    }

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, [options]);

  return ref;
};
