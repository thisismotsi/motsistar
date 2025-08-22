"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center pt-32 px-4"
      style={{
        backgroundImage: "url('/images/hero-background.gif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="img"
      aria-label="Animated background of stars and learning"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0 opacity-70" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Empowering the Future of Learning
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          MOTSISTAR is home where <em>Superstars</em> are born, maintained and
          activated through elegant, engaging, and effective education. Explore
          lessons, resources, and one-on-one guidance — all in one place.
        </p>
        <Link
          href="/resources"
          className="inline-block bg-purple-700 hover:bg-purple-900 text-white px-6 py-3 rounded-full text-lg shadow-lg transition"
          aria-label="Explore educational resources"
        >
          Explore Resources
        </Link>
      </div>
    </section>
  );
}
