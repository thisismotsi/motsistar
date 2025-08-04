"use client";

import { useParams, notFound } from "next/navigation";
import { toolsMap } from "@/data/tools";
import Image from "next/image";

export default function ToolPage() {
  const { slug } = useParams() as { slug: string };
  const tool = toolsMap[slug];

  if (!tool) return notFound();

  return (
    <main className="pt-24 px-4 md:p-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">{tool.name}</h1>
        <p className="text-gray-600 mb-6">{tool.description}</p>

        {tool.iframeUrl ? (
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 mt-6">
            <iframe
              src={tool.iframeUrl}
              title={tool.name}
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center mt-8">
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              width={120}
              height={120}
              className="mb-4"
            />
            <p className="text-red-500">
              This tool is currently unavailable or cannot be embedded.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
