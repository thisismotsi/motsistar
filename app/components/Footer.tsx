"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Newspaper,
} from "lucide-react";
import Image from "next/image";
import Booking from "./BookingForm";
import ContactUs from "./ContactUsForm";

export default function Footer() {
  const [showBooking, setShowBooking] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <footer
      className="bg-gray-100 border-t pt-10 pb-6 text-gray-800"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <a
                href="mailto:blessingtatendamotsi@gmail.com"
                className="hover:text-primary"
                aria-label="Email MOTSISTAR"
              >
                blessingtatendamotsi@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <a
                href="tel:+26879229604"
                className="hover:text-primary"
                aria-label="Call MOTSISTAR"
              >
                +268 7922 9604
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={18} />
              <a
                href="https://wa.me/26879621185?text=Hello%20MOTSISTAR%2C%20I%27m%20interested%20in%20your%20educational%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="WhatsApp MOTSISTAR"
              >
                WhatsApp: +268 7962 1185
              </a>
            </li>
            <li>
              <button
                onClick={() => setShowContact(true)}
                className="mt-2 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900 transition"
              >
                Contact us
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowBooking(true)}
                className="mt-2 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-900 transition"
              >
                Book a Session
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Facebook size={18} />
              <a
                href="https://www.facebook.com/tatendablessing.motsi.5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="Facebook"
              >
                Facebook
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={18} />
              <a
                href="https://x.com/Motsi135733"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Youtube size={18} />
              <a
                href="https://www.youtube.com/@Motsi-tb"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="YouTube"
              >
                YouTube
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={18} />
              <a
                href="https://www.linkedin.com/in/motsi-motsi-206192231"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Newspaper size={18} />
              <a
                href="https://motsistar.blogspot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
                aria-label="Blog"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* About with Logo */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/logo.png"
              alt="MOTSISTAR"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
            <h3 className="text-lg font-semibold text-primary">MOTSISTAR</h3>
          </div>
          <p className="text-sm text-gray-600">
            Elegant and effective learning for the future. Our mission is to
            unlock human potential through affordable, high-quality education.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} <strong>MOTSISTAR</strong>. All rights
        reserved.
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-2xl relative">
            <Booking isVisible={true} onClose={() => setShowBooking(false)} />
          </div>
        </div>
      )}
      {showContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          <div className="w-full max-w-2xl relative">
            <ContactUs isVisible={true} onClose={() => setShowContact(false)} />
          </div>
        </div>
      )}
    </footer>
  );
}
