"use client";

import { useEffect, useRef } from "react";

export default function DesmosScientific() {
  const calculatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src =
      "https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    script.async = true;

    script.onload = () => {
      if (window.Desmos && calculatorRef.current) {
        window.Desmos.ScientificCalculator(calculatorRef.current, {
          keypad: true,
          expressions: true,
          settingsMenu: false,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div ref={calculatorRef} style={{ width: "100%", height: "500px" }} />;
}
