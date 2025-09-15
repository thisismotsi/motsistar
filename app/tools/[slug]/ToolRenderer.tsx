"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// Reusable loading UI
const ToolLoading = () => (
  <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading Tool...</p>
    </div>
  </div>
);

// ✅ Client-side dynamic imports only
const toolComponentMap: { [key: string]: ComponentType<unknown> } = {
  "desmos-calculator": dynamic(() => import("../desmos"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "desmos-scientific-calculator": dynamic(
    () => import("../desmos-scientific"),
    { loading: () => <ToolLoading />, ssr: false }
  ),
  geogebra: dynamic(() => import("../geogebra"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  quizizz: dynamic(() => import("../quizizz"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  codesandbox: dynamic(() => import("../codesandbox"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  scratch: dynamic(() => import("../scratch"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "polygon-explorer": dynamic(() => import("../polygon/PolygonTool"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "turbowarp-scratch": dynamic(() => import("../turbowarp"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-circuit-construction": dynamic(() => import("../phet/circuit-kit"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-graphing-lines": dynamic(() => import("../phet/graphing-lines"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-mass-spring": dynamic(() => import("../phet/mass-spring"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-masses-and-springs": dynamic(() => import("../phet/mass-spring"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-wave-on-a-string": dynamic(() => import("../phet/wave-string"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-wave-string": dynamic(() => import("../phet/wave-string"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-energy-forms": dynamic(() => import("../phet/energy-forms"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-physics": dynamic(() => import("../phet/physics"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-area-model-multiplication": dynamic(
    () => import("../phet/area-model-multiplication"),
    { loading: () => <ToolLoading />, ssr: false }
  ),
  "phet-ray-optics": dynamic(() => import("../phet/ray-optics"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-molecule-shapes": dynamic(() => import("../phet/molecule-shapes"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
};

export default function ToolRenderer({ slug }: { slug: string }) {
  const ToolComponent = toolComponentMap[slug];
  if (!ToolComponent) {
    return (
      <div className="flex flex-col items-center justify-center h-96 p-8 bg-white">
        <p className="text-red-600 font-semibold text-center">
          This tool is currently unavailable or not integrated yet.
        </p>
      </div>
    );
  }
  return <ToolComponent />;
}
