"use client";

import { lessons } from "@/data/videos";
import Features from "./components/Features";
import Hero from "./components/Hero";
import VideoFilterSection from "./components/VideoFilterSection";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
          {/* Purple Ring Loader */}
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <Hero />
          <VideoFilterSection lessons={lessons} />
          <Features />
          {/* other components will go here next */}
        </div>
      )}
    </>
  );
}
