import { useEffect, useRef } from "react";

export default function GeoGebra() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://www.geogebra.org/apps/deployggb.js";
    script.async = true;
    script.onload = () => {
      if (window.GGBApplet && appRef.current) {
        const applet = new window.GGBApplet({
          appName: "graphing",
          width: 800,
          height: 600,
          showToolBar: true,
          showAlgebraInput: true,
          showMenuBar: false,
        });
        applet.inject(appRef.current.id);
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="ggb-element"
      ref={appRef}
      style={{ width: "100%", height: "600px" }}
    />
  );
}
