"use client";

import { useMemo } from "react";
import { useParams, notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { toolsMap } from "@/data/tools";
import type { ComponentType } from "react";

// A reusable loading component for a better user experience.
const ToolLoading = () => (
  <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading Tool...</p>
    </div>
  </div>
);

// Map slugs to their dynamically imported components.
// Each dynamic() call must use an inline object literal for options.
const toolComponentMap: {
  [key: string]: ComponentType<Record<string, unknown>>;
} = {
  "desmos-calculator": dynamic(() => import("../desmos"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "desmos-scientific-calculator": dynamic(
    () => import("../desmos-scientific"),
    {
      loading: () => <ToolLoading />,
      ssr: false,
    }
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
    {
      loading: () => <ToolLoading />,
      ssr: false,
    }
  ),
  "phet-ray-optics": dynamic(() => import("../phet/ray-optics"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
  "phet-molecule-shapes": dynamic(() => import("../phet/molecule-shapes"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),

  // ✅ Add Polygon Explorer here
  "polygon-explorer": dynamic(() => import("../polygon/PolygonTool"), {
    loading: () => <ToolLoading />,
    ssr: false,
  }),
};

export default function ToolPage() {
  const { slug } = useParams() as { slug: string };
  const tool = toolsMap[slug];

  const ToolComponent = useMemo(() => {
    if (!slug) return null;
    return toolComponentMap[slug] || null;
  }, [slug]);

  if (!tool) {
    return notFound();
  }

  return (
    <main className="pt-24 px-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            {tool.name}
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            {tool.description}
          </p>
        </header>

        <div className="mt-6 rounded-xl overflow-hidden shadow-lg border border-gray-200">
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <div className="flex flex-col items-center justify-center h-96 p-8 bg-white">
              <Image
                src={tool.logo}
                alt={`${tool.name} logo`}
                width={120}
                height={120}
                className="mb-4 rounded-lg"
              />
              <p className="text-red-600 font-semibold text-center">
                This tool is currently unavailable or is still being integrated.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
