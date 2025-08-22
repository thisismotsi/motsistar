// types/desmos.d.ts
export {};

declare global {
  interface DesmosCalculator {
    setExpression(expression: Record<string, unknown>): void;
    getState(): Record<string, unknown>;
    setState(state: Record<string, unknown>): void;
    destroy(): void;
  }

  interface Window {
    Desmos?: {
      GraphingCalculator: (
        element: HTMLElement,
        options?: {
          expressions?: boolean;
          keypad?: boolean;
          settingsMenu?: boolean;
          [key: string]: unknown;
        }
      ) => DesmosCalculator;

      ScientificCalculator: (
        element: HTMLElement,
        options?: {
          keypad?: boolean;
          expressions?: boolean;
          settingsMenu?: boolean;
          [key: string]: unknown;
        }
      ) => DesmosCalculator;
    };
  }
}
