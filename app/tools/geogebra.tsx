import { useEffect, useRef } from "react";

export default function Geogebra() {
  const appRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const script = document.createElement("script");
    script.src = "https://www.geogebra.org/scripts/deployggb.js";
    script.async = true;
    script.onload = () => {
      if (window.GGBApplet && appRef.current) {
        new window.GGBApplet(
          {
            appName: "graphing",
            width: 800,
            height: 600,
            showToolBar: true,
            showAlgebraInput: true,
            showMenuBar: true,
          },
          true
        ).inject(appRef.current);
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      ref={appRef}
      className="w-full overflow-auto"
      style={{ height: "600px" }}
    />
  );
}
