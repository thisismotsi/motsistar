import { notFound } from "next/navigation";
import Image from "next/image";
import { toolsMap } from "@/data/tools";
import type { Metadata } from "next";
import ToolRenderer from "./ToolRenderer";

// ✅ SEO Metadata
export async function generateMetadata({
  params,
}: {
  params?: { slug?: string };
}): Promise<Metadata> {
  // runtime-safe guard for params.slug to avoid build-time typing mismatch
  const slug = params && typeof params.slug === "string" ? params.slug : "";
  const tool = toolsMap[slug];
  if (!tool) {
    return {
      title: "Tool Not Found | MotsiStar",
      description: "The requested educational tool could not be found.",
    };
  }

  if (slug === "polygon-explorer") {
    return {
      title: "Polygon Explorer | Regular Polygon Tool & Calculator | MotsiStar",
      description:
        "Interactive tool to explore regular polygons. Learn about interior and exterior angles, side relationships, polygon names, and formulas. Includes animations, notes, and quizzes.",
      keywords: [
        "polygon tool",
        "regular polygon calculator",
        "polygon explorer",
        "interior angle calculator",
        "exterior angle calculator",
        "geometry learning tool",
        "MotsiStar",
      ],
      openGraph: {
        title: "Polygon Explorer | MotsiStar",
        description:
          "Learn everything about polygons with this interactive tool: visualize polygons, see angles, explore formulas, and test yourself with quizzes.",
        url: "https://www.motsistar.org/tools/polygon-explorer",
        siteName: "MotsiStar",
        images: [
          {
            url: "/logos/polygon.png",
            width: 1200,
            height: 630,
            alt: "Polygon Explorer Tool by MotsiStar",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Polygon Explorer | MotsiStar",
        description:
          "Interactive tool to learn about regular polygons, angles, formulas, and quizzes.",
        images: ["/logos/polygon.png"],
      },
    };
  }

  return {
    title: `${tool.name} | MotsiStar`,
    description: tool.description,
  };
}

// ✅ Page (Server Component)
export default function ToolPage(props: unknown) {
  // runtime-safe extraction to avoid Next.js PageProps constraint issues during build
  const { params } = (props as { params?: { slug?: string } }) || {};
  const slug = params?.slug;

  if (!slug) return notFound();

  const tool = toolsMap[slug];
  if (!tool) return notFound();

  const isPolygonExplorer = slug === "polygon-explorer";

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

        {/* ✅ JSON-LD Structured Data for Polygon Explorer */}
        {isPolygonExplorer && (
          <>
            {/* Educational Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "EducationalOccupationalProgram",
                  name: "Polygon Explorer",
                  description:
                    "An interactive tool to explore regular polygons: visualize shapes, angles, formulas, and test your knowledge with quizzes.",
                  provider: {
                    "@type": "Organization",
                    name: "MotsiStar",
                    url: "https://www.motsistar.org",
                  },
                  educationalLevel: "High School",
                  teaches: [
                    "Regular polygons",
                    "Interior and exterior angles",
                    "Polygon side relationships",
                    "Geometry formulas",
                  ],
                  url: "https://www.motsistar.org/tools/polygon-explorer",
                  image: "https://www.motsistar.org/logos/polygon.png",
                  inLanguage: "en",
                }),
              }}
            />

            {/* FAQ Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What is a regular polygon?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "A regular polygon is a polygon with all sides and all angles equal. Examples include an equilateral triangle, square, regular pentagon, etc.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How do you calculate the interior angle of a polygon?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The interior angle of a regular polygon is given by the formula: Interior Angle = (n - 2) × 180° / n, where n is the number of sides.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is the exterior angle of a polygon?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The exterior angle of a regular polygon is given by: Exterior Angle = 360° / n, where n is the number of sides.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Do exterior angles always add up to 360°?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes, the sum of all exterior angles of any polygon, regular or irregular, is always 360°.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How do you calculate the sum of interior angles?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The sum of the interior angles of a polygon is (n - 2) × 180°, where n is the number of sides.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is the relationship between interior and exterior angles?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "For any regular polygon, Interior Angle + Exterior Angle = 180°.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What happens as the number of sides increases?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "As the number of sides increases, a regular polygon approaches the shape of a circle. Its interior angles get closer to 180°, while each exterior angle gets closer to 0°.",
                      },
                    },
                  ],
                }),
              }}
            />
          </>
        )}

        <div className="mt-6 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
          <ToolRenderer slug={slug} />
        </div>
      </div>
    </main>
  );
}
