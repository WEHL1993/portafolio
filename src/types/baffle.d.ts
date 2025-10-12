declare module 'baffle' {
  interface BaffleOptions {
    characters?: string;
    speed?: number;
  }

  interface BaffleInstance {
    set(options: BaffleOptions): BaffleInstance;
    start(): BaffleInstance;
    stop(): BaffleInstance;
    text(callback: (text: string) => string): BaffleInstance;
    reveal(duration?: number, delay?: number): BaffleInstance;
  }

  function baffle(selector: string | Element | NodeList): BaffleInstance;

  export default baffle;
}

declare module 'typed.js' {
  export interface TypedOptions {
    strings?: string[];
    typeSpeed?: number;
    backSpeed?: number;
    backDelay?: number;
    startDelay?: number;
    loop?: boolean;
    loopCount?: number;
    showCursor?: boolean;
    cursorChar?: string;
    contentType?: 'html' | 'text';
    onComplete?: (self: any) => void;
    onTypingPaused?: (arrayPos: number, self: any) => void;
    onTypingResumed?: (arrayPos: number, self: any) => void;
    onStringTyped?: (arrayPos: number, self: any) => void;
    onLastStringBackspaced?: (self: any) => void;
    onReset?: (self: any) => void;
    onStop?: (arrayPos: number, self: any) => void;
    onStart?: (arrayPos: number, self: any) => void;
    onDestroy?: (self: any) => void;
  }

  export default class Typed {
    constructor(element: string | Element, options: TypedOptions);
    
    toggle(): void;
    stop(): void;
    start(): void;
    destroy(): void;
    reset(restart?: boolean): void;
  }
}
