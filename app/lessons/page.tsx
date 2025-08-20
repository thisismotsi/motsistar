import { lessons } from "@/data/videos";
import VideoFilterSection from "../components/VideoFilterSection";

export const metadata = {
  title: "Lessons | MOTSISTAR",
  description:
    "Explore educational video lessons by subject to support your learning.",
};

export default function LessonsPage() {
  return (
    <section className="pt-20 px-4">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        Explore Our Lessons
      </h1>
      <p className="text-center text-gray-600 max-w-xl mx-auto">
        Choose a grade and subject to dive into helpful educational videos.
      </p>
      <div className="sticky top-0 z-20 bg-white pb-2">
        <VideoFilterSection lessons={lessons} />{" "}
        {/* ✅ now lessons are passed */}
      </div>
    </section>
  );
}
