"use client";

import { useState } from "react";
import resourcesData from "../../data/resources.json";
import Input from "../components/ui/Input";
import CategoryFilter from "../components/ui/CategoryFilter";
import ResourceCard from "../components/ResourceCard";
import Button from "../components/ui/Button";

// 1. Define types for resources.json
type Resource = { title: string; file: string };

type ResourcesData = {
  grades: {
    [grade: string]: {
      subjects: {
        [subject: string]: Resource[];
      };
    };
  };
};

// 2. Tell TS that resourcesData matches this shape
const typedResourcesData = resourcesData as ResourcesData;

export default function ResourcesPage() {
  const grades = Object.keys(typedResourcesData.grades);
  const [selectedGrade, setSelectedGrade] = useState<string>(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const subjects = [
    "All",
    ...Object.keys(typedResourcesData.grades[selectedGrade].subjects),
  ];

  const allResources: Resource[] = Object.entries(
    typedResourcesData.grades[selectedGrade].subjects
  )
    .filter(([subject]) =>
      selectedSubject === "All" ? true : subject === selectedSubject
    )
    .flatMap(([_, res]) => res); // TS now knows res is Resource[]

  const filteredResources = allResources.filter((res) =>
    res.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-15 p-6">
      {/* Sticky container for search + grade filter */}

      <h1 className="text-4xl font-bold text-center text-primary mb-2">
        Explore Our Resources
      </h1>
      <p className="text-center text-gray-600 mb-5 max-w-xl mx-auto">
        Select your Grade and the subject you need resources on, or simply
        search and start downloading material that support your learning.
      </p>
      <div className="sticky top-0 z-20 bg-white pb-2">
        <Input
          placeholder="Search resources by topic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 border-purple-400 focus:border-purple-600 focus:border-0.5 focus:ring-purple-50"
        />

        {/* Grade Filter */}
        <div className="flex gap-2 overflow-x-auto mb-2">
          {grades.map((g) => (
            <Button
              key={g}
              onClick={() => {
                setSelectedGrade(g);
                setSelectedSubject("All");
                setVisibleCount(4);
              }}
              className={`px-3 text-sm py-1 rounded-full whitespace-nowrap ${
                selectedGrade === g
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {g.charAt(0).toUpperCase() + g.slice(1).replace("-", " ")}
            </Button>
          ))}
        </div>

        {/* Subject Filter */}
        <CategoryFilter
          categories={subjects}
          selected={selectedSubject}
          onSelect={(s) => {
            setSelectedSubject(s);
            setVisibleCount(4);
          }}
          className="mb-6 bg-white pb-2"
        />
      </div>

      {/* Grade Heading */}
      <h3 className="text-xl font-semibold mb-4 text-purple-700">
        {selectedGrade.charAt(0).toUpperCase() +
          selectedGrade.slice(1).replace("-", " ")}
      </h3>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredResources.slice(0, visibleCount).map((res, i) => (
          <ResourceCard key={i} title={res.title} file={res.file} />
        ))}
      </div>

      {/* Load More */}
      {visibleCount < filteredResources.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-4 py-2 bg-purple-600 text-white rounded-full"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
