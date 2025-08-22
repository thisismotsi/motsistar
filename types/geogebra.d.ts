// types/geogebra.d.ts
export {};

declare global {
  interface Window {
    GGBApplet?: new (
      parameters: {
        appName?: string;
        width?: number;
        height?: number;
        showToolbar?: boolean;
        showAlgebraInput?: boolean;
        showMenuBar?: boolean;
        material_id?: string;
        [key: string]: unknown;
      },
      targetId?: string
    ) => {
      inject: (containerId: string) => void;
    };
  }
}
