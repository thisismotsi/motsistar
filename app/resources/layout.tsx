"use client";

import { ReactNode, useState, useEffect } from "react";
import Input from "../components/ui/Input";
import ResourceNav from "../components/ResourceNav";
import { useRouter } from "next/navigation";
import resourcesData from "../../data/resources.json";

// Add Subject type for type assertion
type Subject = {
  name: string;
  code: string;
  [key: string]: unknown;
};

type SearchResult = {
  councilKey: string;
  levelKey: string;
  subjectKey: string;
  name: string;
};

export default function ResourceLayout({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const showOverlay = activeTab && isHovering;

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const results: SearchResult[] = [];

    Object.entries(resourcesData.councils).forEach(([councilKey, council]) => {
      Object.entries(council.levels).forEach(([levelKey, level]) => {
        Object.entries(level.subjects).forEach(([subjectKey, subject]) => {
          const s = subject as Subject;
          const searchIn = `${s.name} ${s.code}`.toLowerCase();
          if (searchIn.includes(searchQuery.toLowerCase())) {
            results.push({
              councilKey,
              levelKey,
              subjectKey,
              name: s.name,
            });
          }
        });
      });
    });

    setFilteredResults(results);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-[80px] bg-purple-50 z-40 shadow-sm px-4 py-3">
        <div className="mt-1 relative pb-4">
          <Input
            placeholder="Search resources by code or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="z-50 relative"
            aria-label="Search resources"
          />
          {filteredResults.length > 0 && (
            <div
              className="absolute mt-2 w-full bg-white shadow-lg rounded-md max-h-64 overflow-y-auto z-50 text-sm"
              role="listbox"
            >
              {filteredResults.map((result, index) => (
                <div
                  key={`${result.subjectKey}-${index}`}
                  onClick={() => {
                    router.push(
                      `/resources/${result.councilKey}/${
                        result.levelKey
                      }/${encodeURIComponent(result.subjectKey)}`
                    );
                    setSearchQuery("");
                    setFilteredResults([]);
                  }}
                  className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                  tabIndex={0}
                  role="option"
                  aria-selected="false" // Add this line for accessibility compliance
                >
                  {result.name} - {result.councilKey} - {result.levelKey}
                </div>
              ))}
            </div>
          )}
          {searchQuery && filteredResults.length === 0 && (
            <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md text-gray-500 text-sm px-4 py-2 z-50">
              No results found.
            </div>
          )}
        </div>
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setActiveTab(null);
          }}
        >
          <ResourceNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </header>

      {showOverlay && (
        <div className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300" />
      )}

      <main className="p-6 relative z-10">{children}</main>
    </div>
  );
}
