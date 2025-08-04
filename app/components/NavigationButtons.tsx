"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowLeft } from "lucide-react";

// Optional fallback button if you don't have a custom <Button /> component
const CircleButton = ({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center rounded-full px-4 py-2 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all focus:outline-none ${className}`}
  >
    {children}
  </button>
);

export default function NavigationButtons() {
  const pathname = usePathname();
  const router = useRouter();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBack = () => {
    const parts = pathname.split("/").filter(Boolean);
    const newPath = parts.length > 1 ? "/" + parts.slice(0, -1).join("/") : "/";
    router.push(newPath);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Back Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <CircleButton onClick={handleBack}>
          <ArrowLeft size={16} className="mr-2" />
          <span>Back</span>
        </CircleButton>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <div className="fixed bottom-6 right-6 z-40">
          <CircleButton onClick={scrollToTop}>
            <ArrowUp size={16} className="mr-2" />
            <span>Top</span>
          </CircleButton>
        </div>
      )}
    </>
  );
}
