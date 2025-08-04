// components/AffiliateSection.tsx
"use client";

import { useState } from "react";
import { affiliates } from "@/data/affiliates";
import CategoryFilter from "./ui/CategoryFilter";
import GenericCard from "./ui/GenericCard";
import Link from "next/link";

export default function AffiliateSection() {
  const [selected, setSelected] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = ["All", ...new Set(affiliates.map((a) => a.category))];

  const filtered =
    selected === "All"
      ? affiliates
      : affiliates.filter((a) => a.category === selected);

  const visibleAffiliates = filtered.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Expand Your Learning with Our Trusted Partners
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          We’ve partnered with world-renowned educational platforms to help you
          learn smarter, deeper, and broader.
        </p>

        <div className="mb-12">
          <CategoryFilter
            categories={categories}
            selected={selected}
            onSelect={setSelected}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleAffiliates.map(({ name, description, logo, link }) => (
            <Link key={name} href={link}>
              <GenericCard
                title={name}
                description={description}
                image={logo}
              />
            </Link>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="mt-10">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
