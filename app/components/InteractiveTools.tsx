"use client";

import Link from "next/link";
import { useState } from "react";
import { toolsArray } from "@/data/tools";
import CategoryFilter from "../components/ui/CategoryFilter";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import GenericCard from "../components/ui/GenericCard";

const categories = [
  "All",
  "Math",
  "Physics",
  "Biology",
  "Coding",
  "Quizzes",
  "Memory",
  "AI",
  "Chemistry",
  "Language",
];

export default function InteractiveLearningPage() {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [toolsToShow, setToolsToShow] = useState(6);

  const filtered =
    selected === "All"
      ? toolsArray.filter((tool) =>
          tool.name.toLowerCase().includes(search.toLowerCase())
        )
      : toolsArray.filter(
          (tool) =>
            tool.category === selected &&
            tool.name.toLowerCase().includes(search.toLowerCase())
        );

  const displayedTools = filtered.slice(0, toolsToShow);

  const handleLoadMore = () => setToolsToShow((prev) => prev + 6);

  return (
    <section className="py-16 px-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
          Explore Interactive Learning Tools
        </h2>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selected={selected}
          onSelect={setSelected}
          className="mb-4"
        />

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <Input
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md"
            aria-label="Search tools"
          />
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTools.map((tool) => (
            <Link
              href={tool.link}
              key={tool.slug}
              className="block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GenericCard
                title={tool.name}
                description={tool.description}
                image={`/logos/${tool.slug}.png`}
              />
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {toolsToShow < filtered.length && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" onClick={handleLoadMore}>
              Load More Tools
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
