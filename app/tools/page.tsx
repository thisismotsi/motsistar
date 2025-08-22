"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { toolsArray } from "@/data/tools";
import CategoryFilter from "../components/ui/CategoryFilter";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
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
  "Language",
];

const INITIAL_TOOLS_TO_SHOW = 6;
const TOOLS_INCREMENT = 6;

export default function InteractiveLearningPage() {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [toolsToShow, setToolsToShow] = useState(INITIAL_TOOLS_TO_SHOW);

  const filtered = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return toolsArray.filter(
      (tool) =>
        (selected === "All" || tool.category === selected) &&
        tool.name.toLowerCase().includes(lowerSearch)
    );
  }, [selected, search]);

  const displayedTools = filtered.slice(0, toolsToShow);

  const handleLoadMore = () => setToolsToShow((prev) => prev + TOOLS_INCREMENT);

  return (
    <section className="py-16 px-6 bg-background min-h-screen pt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
          Explore Interactive Learning Tools
        </h2>
        <h3 className="text-md text-muted-foreground mb-6 text-center">
          The learning tools featured below are created and owned by their
          respective developers and organizations. motsistar.org does not host
          or modify these tools. Usage should follow the terms set by each
          creator—official sites which you can find{" "}
          <Link
            href={"/affiliates"}
            className="underline text-purple-400 hover:text-purple-600"
          >
            here
          </Link>{" "}
          . Please visit the Official sites for full access and guidelines.
        </h3>
        {/* Search Bar */}
        <div className="flex justify-center mb-2">
          <Input
            placeholder="Search tools..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setToolsToShow(INITIAL_TOOLS_TO_SHOW);
            }}
            className="border-purple-400"
            aria-label="Search tools"
          />
        </div>
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selected={selected}
          onSelect={(cat) => {
            setSelected(cat);
            setToolsToShow(INITIAL_TOOLS_TO_SHOW);
          }}
          className="mb-6"
        />

        {/* Tool Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              tabIndex={0}
              aria-label={tool.name}
            >
              <GenericCard
                title={tool.name}
                description={tool.description}
                image={tool.logo}
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

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            No tools found matching your search.
          </div>
        )}
      </div>
    </section>
  );
}
