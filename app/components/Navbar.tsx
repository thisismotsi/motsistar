"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Button from "../components/ui/Button";
import Booking from "./BookingForm";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/lessons", label: "Lessons" },
  { href: "/resources", label: "Resources" },
  { href: "/tools", label: "Tools" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/affiliates", label: "Affiliates" },
  { href: "https://motsistar.blogspot.com", label: "Blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down → hide navbar
        setShowNavbar(false);
      } else {
        // scrolling up → show navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`bg-white fixed top-0 left-0 w-full z-50 h-20 transition-all duration-300 ${
          showNavbar
            ? "translate-y-0 opacity-100 shadow-md"
            : "-translate-y-full opacity-0 pointer-events-none shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="MOTSISTAR"
              width={80}
              height={80}
              className="w-14 h-14 object-contain"
              priority
            />
            <span className="text-xl font-bold text-primary hidden sm:inline">
              MOTSISTAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-800 items-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hover:text-purple-700 ${
                  pathname === href ? "text-purple-700 font-semibold" : ""
                }`}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}

            <Button onClick={() => setShowBookingForm(true)}>
              Book a Session
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-800"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={24} className="text-red-700" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white px-6 pb-6 pt-4 flex flex-col gap-4 text-gray-800 border-t text-base">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`hover:text-purple-700 ${
                  pathname === href ? "text-purple-700 font-semibold" : ""
                }`}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setMenuOpen(false);
                setShowBookingForm(true);
              }}
              className="w-full text-center"
            >
              Book a Session
            </Button>
          </div>
        )}
      </header>

      {/* Booking Modal */}
      {showBookingForm && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative w-full max-w-2xl">
            <Booking
              isVisible={true}
              onClose={() => setShowBookingForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
