"use client";

import Link from "next/link";
import resourcesData from "../../data/resources.json";
import FolderLink from "../components/FolderLink";

type Council = {
  code: string;
  name: string;
  levels: Record<string, unknown>;
};

export default function ResourcesPage() {
  return (
    <div className="pt-16 p-4">
      <h1 className="text-4xl font-bold text-center mb-2">Explore Resources</h1>
      <h2 className="text-md text-muted-foreground mb-2 text-center">
        The learning resources below are shared for informational and
        educational purposes. motsistar.org does not claim ownership or
        authorship of these materials. All resources should be used in
        accordance with the usage terms set by their original creators—official
        sources are linked{" "}
        <Link
          href={"/affiliates"}
          className="underline text-purple-400 hover:text-purple-600"
        >
          here
        </Link>{" "}
        for direct access and full documentation.
      </h2>

      <h3
        className="text-2xl font-bold text-gray-800 mb-2"
        aria-label="Select a Council"
      >
        Select a Council
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(resourcesData.councils).map(([key, council]) => (
          <FolderLink
            key={key}
            href={`/resources/${key}`}
            label={(council as Council).name}
          />
        ))}
      </div>
    </div>
  );
}
