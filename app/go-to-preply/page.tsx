"use client";

import { useEffect, useState } from "react";

export default function GoToPreply() {
  const referralUrl =
    "https://preply.com/en/invite/MjEzMzgyMDk=?id=1753519311.554645&ep=";
  const profileUrl = "https://preply.in/TATENDA7EN27914140";

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Only run this on the client
    const newWindow = window.open(
      referralUrl,
      "_blank",
      "noopener,noreferrer,width=1,height=1,left=-1000,top=-1000"
    );

    const timer = setTimeout(() => {
      window.location.href = profileUrl;
    }, 3000);

    return () => {
      clearTimeout(timer);
      newWindow?.close();
    };
  }, [isClient]);

  // Render nothing on the server to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="pt-24 flex items-center justify-center min-h-screen bg-white text-center px-4">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Connecting you to Motsi on Preply...
        </h1>
        <p className="text-gray-600" aria-live="polite">
          You’ll be redirected shortly. If nothing happens,{" "}
          <a
            href={profileUrl}
            className="text-blue-600 underline"
            rel="noopener noreferrer"
            title="Go to Motsi's Preply profile"
          >
            click here
          </a>
          .
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="bg-purple-600 h-2 animate-pulse w-full" />
        </div>
      </div>
    </div>
  );
}
