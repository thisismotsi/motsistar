"use client";

import { lessons } from "@/data/videos";
import Features from "./components/Features";
import Hero from "./components/Hero";
import VideoFilterSection from "./components/VideoFilterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <VideoFilterSection lessons={lessons} />
      <Features />

      {/* other components will go here next */}
    </>
  );
}
