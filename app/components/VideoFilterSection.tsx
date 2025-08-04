"use client";

import Image from "next/image";
import { useState } from "react";
import { allVideos } from "@/data/videos";
import Button from "./ui/Button";
import CategoryFilter from "./ui/CategoryFilter";

export default function VideoFilterSection() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [videosToShow, setVideosToShow] = useState(4);

  const subjects = ["All", ...new Set(allVideos.map((v) => v.subject))];

  const filteredVideos =
    selectedSubject === "All"
      ? allVideos
      : allVideos.filter((video) => video.subject === selectedSubject);

  const videosDisplayed = filteredVideos.slice(0, videosToShow);

  const showMore = () => setVideosToShow((prev) => prev + 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold mb-6 text-primary text-center">
        What subject are you interested in?
      </h3>

      {/* Subject Filter */}
      <div className="mb-8">
        <CategoryFilter
          categories={subjects}
          selected={selectedSubject}
          onSelect={(subject: string) => {
            setSelectedSubject(subject);
            setVideosToShow(4);
          }}
        />
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videosDisplayed.map(({ id, title }) => (
          <a
            key={id}
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition"
            aria-label={`Watch ${title} on YouTube`}
          >
            <div className="relative w-full aspect-video">
              <Image
                src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       25vw"
                className="object-cover"
                // Optionally, add a fallback here if needed
              />
            </div>
            <div className="p-3 bg-white">
              <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            </div>
          </a>
        ))}
      </div>

      {/* Show More Button */}
      {videosToShow < filteredVideos.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={showMore} variant="outline">
            Show More
          </Button>
        </div>
      )}
    </section>
  );
}
