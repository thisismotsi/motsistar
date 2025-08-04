"use client";

import { useState, useCallback, useEffect } from "react";
import { BookOpen, Video, FileText, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Booking from "./BookingForm";

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function Features() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const router = useRouter();

  const handleClick = useCallback(
    (title: string) => {
      if (title === "Explore Lessons") return router.push("/lessons");
      if (title === "Download Resources") return router.push("/resources");
      if (title === "Interactive Learning") return router.push("/tools");
      return setIsBookingOpen(true); // For "Book Tutorials"
    },
    [router]
  );

  const features: Feature[] = [
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Explore Lessons",
      description:
        "Access engaging video lessons and tutorials tailored for you.",
    },
    {
      icon: <FileText className="w-10 h-10 text-primary" />,
      title: "Download Resources",
      description: "Get past papers, notes, and marking schemes for exam prep.",
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Book Tutorials",
      description:
        "Schedule personalized one-on-one tutorial sessions anytime.",
    },
    {
      icon: <Video className="w-10 h-10 text-primary" />,
      title: "Interactive Learning",
      description:
        "Engage with interactive quizzes and exercises to test your knowledge.",
    },
  ];

  // Close modal on Escape key
  useEffect(() => {
    if (!isBookingOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsBookingOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isBookingOpen]);

  return (
    <section className="py-16 px-6 bg-background" id="features">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">
          What can you do with MOTSISTAR?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
          {features.map(({ icon, title, description }) => (
            <button
              key={title}
              type="button"
              aria-label={title}
              onClick={() => handleClick(title)}
              className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition w-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {icon}
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="booking-modal-title"
          onClick={() => setIsBookingOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-2xl relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="booking-modal-title" className="sr-only">
              Book Tutorials Modal
            </h2>
            <Booking isVisible={true} onClose={() => setIsBookingOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
}
