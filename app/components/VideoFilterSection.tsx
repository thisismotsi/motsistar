"use client";

import Image from "next/image";
import { useState } from "react";
import { LessonsData } from "@/data/videos";
import Button from "./ui/Button";
import CategoryFilter from "./ui/CategoryFilter";
import Input from "./ui/Input";

type Props = {
  lessons: LessonsData;
};

export default function VideoFilterSection({ lessons }: Props) {
  const [selectedGrade, setSelectedGrade] = useState<keyof typeof lessons>(
    Object.keys(lessons)[0] as keyof typeof lessons // ✅ fallback to first grade
  );
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [videosToShow, setVideosToShow] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ guard against missing lessons
  if (!lessons || !lessons[selectedGrade]) {
    return <p className="text-center text-gray-500">No lessons available.</p>;
  }

  const subjects = ["All", ...Object.keys(lessons[selectedGrade].subjects)];

  const allVideosForGrade = Object.values(
    lessons[selectedGrade].subjects
  ).flat();

  const filteredVideos =
    selectedSubject === "All"
      ? allVideosForGrade
      : lessons[selectedGrade].subjects[selectedSubject] || [];

  const searchedVideos = filteredVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const videosDisplayed = searchedVideos.slice(0, videosToShow);

  const showMore = () => setVideosToShow((prev) => prev + 4);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h3 className="text-2xl font-bold mb-6 text-primary text-center">
        Choose Grade & Subject
      </h3>
      {/* Search */}
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search lessons by topic.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {/* Grade Selector */}
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(lessons).map((grade) => (
          <Button
            key={grade}
            onClick={() => {
              setSelectedGrade(grade as keyof typeof lessons);
              setSelectedSubject("All");
              setVideosToShow(4);
            }}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedGrade === grade
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-400"
            }`}
          >
            {grade.charAt(0).toUpperCase() + grade.slice(1).replace("-", " ")}
          </Button>
        ))}
      </div>

      {/* Subject Filter */}
      <div className="mb-6">
        <CategoryFilter
          categories={subjects}
          selected={selectedSubject}
          onSelect={(subject: string) => {
            setSelectedSubject(subject);
            setVideosToShow(4);
          }}
        />
      </div>

      {/* Video Grid */}
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
                className="object-cover"
              />
            </div>
            <div className="p-3 bg-white">
              <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            </div>
          </a>
        ))}
      </div>

      {/* Show More Button */}
      {videosToShow < searchedVideos.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={showMore} variant="outline">
            Show More
          </Button>
        </div>
      )}
    </section>
  );
}
