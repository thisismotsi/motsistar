import { useEffect, useRef } from "react";

export default function DesmosGraph() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const calculatorInstance = useRef<DesmosCalculator | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src =
      "https://www.desmos.com/api/v1.6/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    script.async = true;
    script.onload = () => {
      if (window.Desmos && calculatorRef.current) {
        calculatorInstance.current = window.Desmos.GraphingCalculator(
          calculatorRef.current,
          { expressions: true, keypad: true }
        );
      }
    };
    document.body.appendChild(script);

    return () => {
      calculatorInstance.current?.destroy();
    };
  }, []);

  return <div ref={calculatorRef} style={{ width: "100%", height: "500px" }} />;
}
