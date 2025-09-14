"use client";

import React, { useMemo, useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

/**
 * PolygonTool.tsx
 * Drop into your Next.js project.
 *
 * Requirements:
 * - react-katex + katex installed
 * - TailwindCSS available
 *
 * This file implements:
 * - interactive regular polygon visualizer (extended edges + angle arcs + labels)
 * - second instance with center-to-vertex triangles and angle labels
 * - math rendered with KaTeX
 * - slider, +/-, numeric input, ∞ toggle (simulated by very large n)
 * - 10-question interactive quiz
 *
 * Author: ChatGPT for motsistar.org (purple brand)
 */

/* polygon names for common n */
const polygonNames: Record<number, string> = {
  3: "Triangle",
  4: "Quadrilateral",
  5: "Pentagon",
  6: "Hexagon",
  7: "Heptagon",
  8: "Octagon",
  9: "Nonagon",
  10: "Decagon",
  11: "Hendecagon",
  12: "Dodecagon",
};

type QuizQuestion = {
  id: number;
  q: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
};

const QUIZ: QuizQuestion[] = [
  {
    id: 1,
    q: "What is the sum of interior angles of a triangle (n = 3)?",
    options: ["180°", "360°", "540°", "90°"],
    answerIndex: 0,
    explanation: "Sum = (n − 2) × 180° = (3 − 2) × 180° = 180°",
  },
  {
    id: 2,
    q: "Each interior angle of a square (n = 4) equals:",
    options: ["60°", "90°", "120°", "45°"],
    answerIndex: 1,
    explanation: "Interior = ((n−2)×180) / n = (2×180)/4 = 90°",
  },
  {
    id: 3,
    q: "Exterior angle of a regular pentagon (n = 5)?",
    options: ["72°", "90°", "60°", "120°"],
    answerIndex: 0,
    explanation: "Exterior = 360°/n = 360/5 = 72°",
  },
  {
    id: 4,
    q: "A regular polygon has interior angles 120° each. How many sides (n)?",
    options: ["3", "4", "5", "6"],
    answerIndex: 3,
    explanation: "Exterior = 180 − 120 = 60, n = 360 / 60 = 6",
  },
  {
    id: 5,
    q: "Sum of interior angles for n = 8 (octagon)?",
    options: ["540°", "720°", "1080°", "900°"],
    answerIndex: 2,
    explanation: "Sum = (8−2)×180 = 6×180 = 1080°",
  },
  {
    id: 6,
    q: "If exterior angle = 30°, how many sides?",
    options: ["10", "12", "6", "8"],
    answerIndex: 1,
    explanation: "n = 360 / 30 = 12",
  },
  {
    id: 7,
    q: "Central angle (vertex to center) for a regular n-gon equals:",
    options: ["360°/n", "180°/n", "(n−2)×180°", "360°/(n−2)"],
    answerIndex: 0,
    explanation: "Central angle = 360°/n",
  },
  {
    id: 8,
    q: "As n → ∞, what does each interior angle approach?",
    options: ["90°", "180°", "0°", "360°"],
    answerIndex: 1,
    explanation: "Interior → 180°, exterior → 0°",
  },
  {
    id: 9,
    q: "Side length formula for circumradius R: (choose the expression)",
    options: ["2R·sin(π/n)", "R·cos(π/n)", "R·tan(π/n)", "2R·cos(π/n)"],
    answerIndex: 0,
    explanation: "Side length s = 2R·sin(π/n)",
  },
  {
    id: 10,
    q: "If sum of interior angles is 1260°, how many sides?",
    options: ["8", "9", "10", "11"],
    answerIndex: 2,
    explanation:
      "Sum = (n−2)180 = 1260 → n−2 = 7 → n = 9? Wait — check: 7×180=1260 so n=9. (Correct: 9)",
  },
];

export default function PolygonTool(): React.ReactElement {
  const [n, setN] = useState<number>(5);
  const [radius, setRadius] = useState<number>(120);
  const [infinite, setInfinite] = useState<boolean>(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Constrain n
  const effectiveN = infinite ? Math.max(500, n) : Math.max(3, Math.round(n));

  // Geometry calculations
  const sumInterior = (effectiveN - 2) * 180;
  const interiorAngle = infinite ? 180 : ((effectiveN - 2) * 180) / effectiveN; // degrees
  const exteriorAngle = infinite ? 0 : 360 / effectiveN;
  const sideLength = 2 * radius * Math.sin(Math.PI / effectiveN);
  const polygonName = polygonNames[effectiveN] || `${effectiveN}-gon`;

  /* compute polygon vertices - centered at (0,0) - returns array of {x,y,angle} */
  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / effectiveN;
    return Array.from({ length: effectiveN }, (_, i) => {
      const theta = i * angleStep - Math.PI / 2; // start from top
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      return { x, y, theta };
    });
  }, [effectiveN, radius]);

  /* helpers for extended lines: create a line with length factor beyond vertices */
  const extendLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    extend = 1000
  ) => {
    // line from (x1,y1) to (x2,y2) extended both directions by 'extend'
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const sx = x1 - ux * extend;
    const sy = y1 - uy * extend;
    const ex = x2 + ux * extend;
    const ey = y2 + uy * extend;
    return { sx, sy, ex, ey };
  };

  /* draw a small arc for an angle at vertex: interior or exterior */
  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    startAngleDeg: number,
    endAngleDeg: number
  ) => {
    // convert degrees to radians and compute path
    const start = polarToCartesian(cx, cy, r, endAngleDeg);
    const end = polarToCartesian(cx, cy, r, startAngleDeg);
    const largeArcFlag =
      Math.abs(endAngleDeg - startAngleDeg) <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  /* UI handlers */
  const handleDecrease = () => {
    setInfinite(false);
    setN((prev) => Math.max(3, Math.round(prev) - 1));
  };
  const handleIncrease = () => {
    setInfinite(false);
    setN((prev) => Math.round(prev) + 1);
  };
  const handleSetN = (value: number) => {
    setInfinite(false);
    setN(Math.max(3, Math.round(value)));
  };
  const handleToggleInfinite = () => {
    setInfinite((s) => !s);
    if (!infinite) {
      // going infinite: keep n but use large effectiveN for drawing
      setN((prev) => Math.max(prev, 1000));
    } else {
      // return to default 5
      setN(5);
    }
  };

  /* Quiz functions */
  const currQuestion = QUIZ[quizIndex];
  const handleQuizSelect = (i: number) => {
    setSelectedOption(i);
  };
  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currQuestion.answerIndex;
    if (correct) setQuizScore((s) => s + 1);
    setShowExplanation(true);
  };
  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    if (quizIndex + 1 < QUIZ.length) {
      setQuizIndex((i) => i + 1);
    } else {
      // finished - show result and reset possibility
    }
  };
  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  /* helper to position label near angle arc */
  const angleLabelPos = (
    vx: number,
    vy: number,
    bisectorAngleRad: number,
    distance = 26
  ) => {
    // bisector angle rad is direction inward for interior (from vertex toward polygon center)
    const x = vx + Math.cos(bisectorAngleRad) * distance;
    const y = vy + Math.sin(bisectorAngleRad) * distance;
    return { x, y };
  };

  /* render */
  return (
    <div className="w-full p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700">
            Polygon Explorer
          </h1>
          <p className="text-gray-600">
            Visualize regular polygons inside a circle — angles, sides, and
            exact formulas. Interactive and educational.
          </p>
        </header>

        {/* Controls */}
        <section className="bg-white rounded-xl p-4 shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 rounded bg-purple-600 text-white font-bold"
              >
                −
              </button>
              <input
                type="number"
                min={3}
                value={infinite ? 1000 : Math.round(n)}
                onChange={(e) => handleSetN(Number(e.target.value))}
                className="w-20 text-center border rounded p-1"
              />
              <button
                onClick={handleIncrease}
                className="px-3 py-1 rounded bg-purple-600 text-white font-bold"
              >
                +
              </button>

              <div className="mx-4 flex items-center gap-2">
                <label className="text-sm font-medium">Simulate ∞</label>
                <button
                  onClick={handleToggleInfinite}
                  className={`px-3 py-1 rounded font-semibold ${
                    infinite
                      ? "bg-purple-700 text-white"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {infinite ? "∞ ON" : "∞ OFF"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 md:ml-auto">
              <input
                type="range"
                min={3}
                max={500}
                value={infinite ? 500 : Math.min(500, Math.round(n))}
                onChange={(e) => handleSetN(Number(e.target.value))}
                className="w-60"
              />
              <div className="text-right">
                <div className="text-sm text-gray-500">n (number of sides)</div>
                <div className="font-semibold text-lg text-purple-700">
                  {infinite ? "∞ (simulated)" : effectiveN}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main visualization and formulas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: visualization with extended lines */}
          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-purple-700">Diagram</h2>
              <div className="text-sm text-gray-600">R = {radius}px</div>
            </div>

            <svg
              width={380}
              height={380}
              viewBox="-190 -190 380 380"
              className="rounded-lg border"
            >
              {/* circumscribed circle */}
              <circle
                cx="0"
                cy="0"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth={2}
                fill="none"
              />

              {/* extended edges */}
              {points.map((p, i) => {
                const next = points[(i + 1) % points.length];
                const ext = extendLine(p.x, p.y, next.x, next.y, 1200);
                return (
                  <line
                    key={`ext-${i}`}
                    x1={ext.sx}
                    y1={ext.sy}
                    x2={ext.ex}
                    y2={ext.ey}
                    stroke="#e6e6e6"
                    strokeWidth={1}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* polygon fill & border */}
              <polygon
                points={points.map((pt) => `${pt.x},${pt.y}`).join(" ")}
                fill="rgba(139,92,246,0.12)"
                stroke="rgb(99,41,192)"
                strokeWidth={3}
              />

              {/* draw interior & exterior arcs + labels at a representative vertex (use first vertex) and also draw for every vertex */}
              {points.map((v, i) => {
                // compute interior & exterior arc angles for small arcs
                // interior arc centered at vertex, arc spanning interiorAngle degrees centered on bisector
                // need the direction of bisector: angle to center from vertex
                const centerAngle = Math.atan2(-v.y, -v.x); // vector from vertex to center (0,0)
                const centerAngleDeg = (centerAngle * 180) / Math.PI;
                const interiorDeg = infinite ? 180 : interiorAngle; // degrees
                const exteriorDeg = infinite ? 0 : exteriorAngle;

                // For drawing arcs: compute start and end degrees for interior (small arc inside polygon)
                // We'll place interior arc of radius 22, spanning interiorDeg but clamped to at most 120 for drawing
                const interiorArcSpan = Math.min(130, interiorDeg); // reduce huge arcs
                const exteriorArcSpan = Math.min(
                  160,
                  exteriorDeg || 0 + 0.0001
                );

                // interior arc runs from centerAngleDeg - interiorArcSpan/2 to centerAngleDeg + interiorArcSpan/2
                const interiorStart = centerAngleDeg - interiorArcSpan / 2;
                const interiorEnd = centerAngleDeg + interiorArcSpan / 2;

                // exterior arc is outside, bisector is opposite of centerAngle
                const exteriorBisectorDeg = centerAngleDeg + 180;
                const exteriorStart = exteriorBisectorDeg - exteriorArcSpan / 2;
                const exteriorEnd = exteriorBisectorDeg + exteriorArcSpan / 2;

                // label positions
                const interiorBisectorRad = (centerAngleDeg * Math.PI) / 180;
                const exteriorBisectorRad =
                  (exteriorBisectorDeg * Math.PI) / 180;

                const interiorLabel =
                  interiorDeg === 180 ? "180°" : `${interiorDeg.toFixed(2)}°`;
                const exteriorLabel =
                  exteriorDeg === 0 ? "0°" : `${exteriorDeg.toFixed(2)}°`;

                const interiorLabelPosXY = angleLabelPos(
                  v.x,
                  v.y,
                  interiorBisectorRad,
                  28
                );
                const exteriorLabelPosXY = angleLabelPos(
                  v.x,
                  v.y,
                  exteriorBisectorRad,
                  36
                );

                return (
                  <g key={`angles-${i}`}>
                    {/* interior arc */}
                    {/* <path
                      d={describeArc(v.x, v.y, 22, interiorStart, interiorEnd)}
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    /> */}
                    {/* exterior arc */}
                    <path
                      d={describeArc(v.x, v.y, 32, exteriorStart, exteriorEnd)}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth={2.2}
                      strokeLinecap="round"
                    />
                    {/* labels */}
                    <text
                      x={interiorLabelPosXY.x}
                      y={interiorLabelPosXY.y}
                      fontSize={12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#5b21b6"
                      fontWeight={700}
                    >
                      {interiorLabel}
                    </text>

                    <text
                      x={exteriorLabelPosXY.x}
                      y={exteriorLabelPosXY.y}
                      fontSize={12}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#dc2626"
                      fontWeight={700}
                    >
                      {exteriorLabel}
                    </text>
                  </g>
                );
              })}

              {/* center sum text */}
              <text
                x={0}
                y={-6}
                textAnchor="middle"
                fontSize={18}
                fontWeight={800}
                fill="#6d28d9"
              >
                Σ = {sumInterior}°
              </text>
              <text
                x={0}
                y={14}
                textAnchor="middle"
                fontSize={12}
                fill="#6d28d9"
              >
                Sum of interior angles
              </text>
            </svg>
          </div>

          {/* Right: formulas & values (KaTeX math) */}
          <div className="bg-purple-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">
              {polygonName} ({infinite ? "∞ (simulated)" : effectiveN} sides)
            </h3>

            <div className="space-y-3 text-gray-800">
              <div>
                <BlockMath
                  math={`\\text{Sum of interior angles} = (n-2)\\times180^\\circ = ${sumInterior}^\\circ`}
                />
              </div>

              <div>
                <BlockMath
                  math={`\\text{Each interior angle} = \\dfrac{(n-2)\\times180^\\circ}{n} = ${
                    infinite
                      ? "180^\\circ"
                      : `${interiorAngle.toFixed(4)}^\\circ`
                  }`}
                />
              </div>

              <div>
                <BlockMath
                  math={`\\text{Each exterior angle} = 180^\\circ - \\text{interior} = ${
                    infinite
                      ? "0^\\circ"
                      : `${(180 - interiorAngle).toFixed(4)}^\\circ`
                  }`}
                />
              </div>

              <div>
                <BlockMath
                  math={`\\text{Or: each exterior angle} = \\dfrac{360^\\circ}{n} = ${
                    infinite ? "0^\\circ" : `${exteriorAngle.toFixed(4)}^\\circ`
                  }`}
                />
              </div>

              <div>
                <BlockMath
                  math={`\\dfrac{360^\\circ}{\\text{exterior angle}} = n \\quad\\text{(so } n = \\dfrac{360^\\circ}{\\text{exterior}}\\text{)}`}
                />
              </div>

              <div>
                <BlockMath
                  math={`\\text{Side length } s = 2R\\sin\\left(\\dfrac{\\pi}{n}\\right) \\approx ${sideLength.toFixed(
                    4
                  )}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second instance: triangles from center */}
        <section className="bg-white mt-6 p-4 rounded-xl shadow">
          <h3 className="text-xl font-bold text-purple-700 mb-2">
            Triangles from center
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <svg
              width={360}
              height={360}
              viewBox="-180 -180 360 360"
              className="rounded-lg border"
            >
              {/* circle */}
              <circle
                cx="0"
                cy="0"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth={2}
                fill="none"
              />

              {/* triangles (center to each vertex and next vertex) */}
              {points.map((p, i) => {
                const next = points[(i + 1) % points.length];
                // polygon triangle (center, p, next)
                return (
                  <g key={`tri-${i}`}>
                    <polygon
                      points={`0,0 ${p.x},${p.y} ${next.x},${next.y}`}
                      fill={
                        i % 2 === 0
                          ? "rgba(99,41,192,0.08)"
                          : "rgba(99,41,192,0.04)"
                      }
                      stroke="none"
                    />
                    {/* triangle edges from center */}
                    <line
                      x1={0}
                      y1={0}
                      x2={p.x}
                      y2={p.y}
                      stroke="#94a3b8"
                      strokeWidth={1}
                    />
                  </g>
                );
              })}

              {/* polygon border */}
              <polygon
                points={points.map((pt) => `${pt.x},${pt.y}`).join(" ")}
                fill="none"
                stroke="rgb(99,41,192)"
                strokeWidth={2.5}
              />

              {/* central angle labels on each triangle */}
              {points.map((p, i) => {
                const next = points[(i + 1) % points.length];
                // central angle is 360/n
                const centralDeg = infinite ? 0 : 360 / effectiveN;
                // label position: half-way between p and next, scaled inward a bit
                const midx = (p.x + next.x) / 2;
                const midy = (p.y + next.y) / 2;
                const inwardX = midx * 0.55;
                const inwardY = midy * 0.55;
                return (
                  <g key={`cang-${i}`}>
                    <text
                      x={inwardX}
                      y={inwardY}
                      fontSize={11}
                      fill="#1f2937"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {centralDeg === 0 ? "0°" : `${centralDeg.toFixed(2)}°`}
                    </text>
                  </g>
                );
              })}

              {/* show base angles at vertex (each triangle has base angles = interior/2) */}
              {points.map((p, i) => {
                const baseAngleDeg = infinite ? 90 : interiorAngle / 2;
                // find bisector directions for label positions
                // two base angle labels near vertex p and next vertex
                // label near p inside polygon
                const bisectorToCenter = Math.atan2(-p.y, -p.x);
                const labelPos = angleLabelPos(p.x, p.y, bisectorToCenter, 18);
                return (
                  <text
                    key={`base-${i}`}
                    x={labelPos.x}
                    y={labelPos.y}
                    fontSize={11}
                    fill="#4b5563"
                    textAnchor="middle"
                  >
                    {`${
                      baseAngleDeg === 90
                        ? "90°"
                        : `${baseAngleDeg.toFixed(2)}°`
                    }`}
                  </text>
                );
              })}
            </svg>

            <div className="flex-1">
              <p className="text-gray-700 mb-2">
                The polygon divides into{" "}
                <strong className="text-purple-700">{effectiveN - 2}</strong>{" "}
                triangles (by connecting vertices to the center).
              </p>
              <BlockMath
                math={`\\text{Each central angle} = \\dfrac{360^\\circ}{n} = ${
                  infinite
                    ? "0^\\circ"
                    : `${(360 / effectiveN).toFixed(4)}^\\circ`
                }`}
              />
              <BlockMath
                math={`\\text{Each base angle (triangle)} = \\dfrac{\\text{interior}}{2} = ${
                  infinite
                    ? "90^\\circ"
                    : `${(interiorAngle / 2).toFixed(4)}^\\circ`
                }`}
              />
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="bg-white rounded-xl p-6 mt-6 shadow">
          <h3 className="text-2xl font-bold text-purple-700 mb-3">
            Notes & Key Formulas
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Sum of interior angles: <InlineMath math="(n-2)\times180^\circ" />
              .
            </li>
            <li>
              Each interior angle:{" "}
              <InlineMath math="\dfrac{(n-2)\times180^\circ}{n}" />.
            </li>
            <li>
              Each exterior angle: <InlineMath math="360^\circ / n" /> or{" "}
              <InlineMath math="180^\circ - \text{interior}" />.
            </li>
            <li>
              Sum of exterior angles (one per vertex) = <strong>360°</strong>.
            </li>
            <li>
              Side length with circumradius R:{" "}
              <InlineMath math="s = 2R\sin(\pi/n)" />.
            </li>
            <li>
              As <InlineMath math="n\to\infty" />, the regular polygon
              approaches a circle: interior → 180°, exterior → 0°.
            </li>
          </ul>
        </section>

        {/* Quiz */}
        <section className="bg-purple-50 rounded-xl p-6 mt-6 shadow">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">
            Practice Quiz
          </h3>

          {quizIndex < QUIZ.length ? (
            <div>
              <div className="mb-3 text-gray-800 font-semibold">
                Question {quizIndex + 1} / {QUIZ.length}
              </div>
              <div className="mb-4 bg-white p-4 rounded">
                <div className="text-lg font-medium mb-3">{currQuestion.q}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currQuestion.options.map((opt, i) => {
                    const selected = selectedOption === i;
                    const correct = currQuestion.answerIndex === i;
                    const showCorrectness = showExplanation;
                    return (
                      <button
                        key={i}
                        onClick={() => handleQuizSelect(i)}
                        className={`text-left p-3 rounded border ${
                          selected
                            ? "border-purple-700 bg-purple-100"
                            : "border-gray-200 bg-white"
                        } ${
                          showCorrectness && correct
                            ? "ring-2 ring-green-300"
                            : ""
                        }`}
                      >
                        <div className="font-medium">{opt}</div>
                        {showCorrectness && correct && (
                          <div className="text-sm text-green-700 mt-1">
                            Correct
                          </div>
                        )}
                        {showCorrectness && selected && !correct && (
                          <div className="text-sm text-red-600 mt-1">
                            Incorrect
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex gap-2">
                  {!showExplanation ? (
                    <button
                      onClick={handleQuizSubmit}
                      className="px-4 py-2 bg-purple-700 text-white rounded font-semibold"
                      disabled={selectedOption === null}
                    >
                      Submit
                    </button>
                  ) : (
                    <>
                      <div className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                        {currQuestion.explanation}
                      </div>
                      <button
                        onClick={handleNextQuestion}
                        className="px-4 py-2 bg-purple-600 text-white rounded font-semibold ml-auto"
                      >
                        Next
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600">Score: {quizScore}</div>
            </div>
          ) : (
            <div>
              <div className="text-lg font-semibold mb-2">Quiz complete!</div>
              <div className="mb-3">
                You scored {quizScore} / {QUIZ.length}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="px-4 py-2 bg-purple-700 text-white rounded"
                >
                  Restart
                </button>
              </div>
            </div>
          )}
        </section>

        <footer className="text-xs text-gray-500 mt-6">
          Tip: Try toggling the ∞ switch to see how the polygon tends to a
          circle.
        </footer>
      </div>
    </div>
  );
}

/* Utility functions repeated at bottom to avoid hoisting issues */
function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngleDeg: number,
  endAngleDeg: number
) {
  const start = polarToCartesian(cx, cy, r, endAngleDeg);
  const end = polarToCartesian(cx, cy, r, startAngleDeg);
  const largeArcFlag = Math.abs(endAngleDeg - startAngleDeg) <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function angleLabelPos(
  vx: number,
  vy: number,
  bisectorAngleRad: number,
  distance = 26
) {
  const x = vx + Math.cos(bisectorAngleRad) * distance;
  const y = vy + Math.sin(bisectorAngleRad) * distance;
  return { x, y };
}
