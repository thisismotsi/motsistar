export const metadata = {
  title: "Lessons | MOTSISTAR",
  description:
    "Explore educational video lessons by subject to support your learning.",
};

import VideoFilterSection from "../components/VideoFilterSection";

export default function LessonsPage() {
  return (
    <section className="pt-20 px-4">
      <h1 className="text-4xl font-bold text-center text-primary mb-6">
        Explore Our Lessons
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
        Choose a subject to dive into and watch helpful educational videos to
        support your learning.
      </p>
      <VideoFilterSection />
    </section>
  );
}
