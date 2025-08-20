// 1. Desmos Graphing Calculator
"use client";

import { useEffect, useRef } from "react";

export default function DesmosTool() {
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    script.async = true;
    script.onload = () => {
      if (calculatorRef.current) {
        const calculator = Desmos.GraphingCalculator(calculatorRef.current, {
          expressions: true,
          keypad: true,
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return <div ref={calculatorRef} className="w-full h-[600px]" />;
}
