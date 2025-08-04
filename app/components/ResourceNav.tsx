"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import type { ResourcesData } from "@/types/resources";
import rawResources from "../../data/resources.json";

const resourcesData = rawResources as unknown as ResourcesData;

const tabs = [
  { key: "pastPapers", label: "Past Papers" },
  { key: "specimens", label: "Specimen Papers" },
  { key: "syllabuses", label: "Syllabus" },
];

export default function ResourceNav({
  activeTab,
  setActiveTab,
}: {
  activeTab: string | null;
  setActiveTab: (key: string | null) => void;
}) {
  const [hoveredCouncil, setHoveredCouncil] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  const handleTabInteraction = (key: string) => {
    if (activeTab === key) {
      setActiveTab(null);
      setHoveredCouncil(null);
      setHoveredLevel(null);
    } else {
      setActiveTab(key);
    }
  };

  const handleCloseAll = () => {
    setActiveTab(null);
    setHoveredCouncil(null);
    setHoveredLevel(null);
  };

  return (
    <div className="flex gap-6 mb-6 relative z-20">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className="relative"
          onMouseEnter={() => setActiveTab(tab.key)}
          onMouseLeave={handleCloseAll}
          onClick={() => handleTabInteraction(tab.key)}
        >
          <div
            className={`px-2 pb-2 border-b-2 transition-colors duration-200 text-sm font-medium cursor-pointer ${
              activeTab === tab.key
                ? "border-purple-700 text-purple-700"
                : "border-transparent text-gray-800 hover:text-purple-700"
            }`}
          >
            {tab.label}
          </div>

          <AnimatePresence>
            {activeTab === tab.key && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 z-30 mt-2 flex bg-white shadow-xl rounded-md"
              >
                <DropdownContent
                  onClose={handleCloseAll}
                  setActiveTab={setActiveTab}
                  hoveredCouncil={hoveredCouncil}
                  setHoveredCouncil={setHoveredCouncil}
                  hoveredLevel={hoveredLevel}
                  setHoveredLevel={setHoveredLevel}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function DropdownContent({
  onClose,

  hoveredCouncil,
  setHoveredCouncil,
  hoveredLevel,
  setHoveredLevel,
}: {
  onClose: () => void;
  setActiveTab: (key: string | null) => void;
  hoveredCouncil: string | null;
  setHoveredCouncil: (key: string | null) => void;
  hoveredLevel: string | null;
  setHoveredLevel: (key: string | null) => void;
}) {
  const router = useRouter();

  return (
    <div className="flex text-xs -mt-2" role="menu">
      <div className="w-48 p-2 space-y-1">
        {Object.entries(resourcesData.councils).map(([councilKey, council]) => (
          <div
            key={councilKey}
            onMouseEnter={() => {
              setHoveredCouncil(councilKey);
              setHoveredLevel(null);
            }}
            onClick={() => {
              setHoveredCouncil(councilKey);
              setHoveredLevel(null);
            }}
            className="block text-black hover:text-purple-700 cursor-pointer"
            tabIndex={0}
            role="menuitem"
          >
            {council.name}
          </div>
        ))}
      </div>
      {hoveredCouncil && (
        <div className="w-48 p-2 space-y-1">
          {Object.entries(resourcesData.councils[hoveredCouncil].levels).map(
            ([levelKey, level]) => (
              <div
                key={levelKey}
                onMouseEnter={() => setHoveredLevel(levelKey)}
                onClick={() => setHoveredLevel(levelKey)}
                className="block text-black hover:text-purple-700 cursor-pointer"
                tabIndex={0}
                role="menuitem"
              >
                {level.name}
              </div>
            )
          )}
        </div>
      )}
      {hoveredCouncil && hoveredLevel && (
        <div className="w-60 p-2 space-y-1">
          {Object.entries(
            resourcesData.councils[hoveredCouncil].levels[hoveredLevel].subjects
          ).map(([subjectKey, subject]) => (
            <div
              key={subjectKey}
              onClick={() => {
                onClose();
                router.push(
                  `/resources/${hoveredCouncil}/${hoveredLevel}/${encodeURIComponent(
                    subjectKey
                  )}`
                );
              }}
              className="block text-black hover:text-purple-700 cursor-pointer"
              tabIndex={0}
              role="menuitem"
            >
              {subject.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
