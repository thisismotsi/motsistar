"use client";

import { useState, useEffect } from "react";
import {
  X,
  PhoneCall,
  MessageSquareText,
  Globe,
  Send as SendIcon,
} from "lucide-react";

interface BookingProps {
  onClose: () => void;
  text?: string;
  isVisible: boolean;
}

export default function Booking({ onClose, text, isVisible }: BookingProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<{
    name?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      window.location.href = "/";
    }
  }, [status, countdown]);

  const validateFields = () => {
    const newErrors: typeof errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = true;
    if (!email.trim() || !emailPattern.test(email)) newErrors.email = true;
    if (!message.trim()) newErrors.message = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateFields()) {
      setErrorMsg("Please correct the highlighted fields.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setStatus("success");
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to send email");
      setStatus("error");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
    setErrors({});
  };

  const inputBaseStyle =
    "w-full p-3 rounded-md border transition focus:outline-none focus:ring-2";
  const validStyle = "border-purple-500 focus:ring-purple-500";
  const errorStyle = "border-red-600 focus:ring-red-500";

  const CloseButton = () => (
    <button
      aria-label="Close form"
      onClick={onClose}
      className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 z-50"
    >
      <X size={20} />
    </button>
  );

  const ExtraButtons = () => (
    <div className="mt-8 space-y-4">
      <p className="text-center text-gray-500 font-medium">or</p>
      <a
        href="/go-to-preply"
        className="flex items-center justify-center gap-2 w-full text-center bg-pink-400 text-white py-3 rounded-md hover:bg-pink-600"
      >
        Connect with us via Preply <Globe size={18} />
      </a>
      <a
        href="https://wa.me/26879621185?text=Hi%2C%20I%20found%20your%20site%20and%20would%20like%20to%20connect!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full text-center bg-green-500 text-white py-3 rounded-md hover:bg-green-700"
      >
        Chat on WhatsApp <MessageSquareText size={18} />
      </a>
      <a
        href="tel:+26879229604"
        className="flex items-center justify-center gap-2 w-full text-center bg-blue-500 text-white py-3 rounded-md hover:bg-blue-700"
      >
        Call Now <PhoneCall size={18} />
      </a>
    </div>
  );

  if (!isVisible) return null;

  if (status === "success") {
    return (
      <section className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center max-h-[90vh] overflow-y-auto">
        <CloseButton />
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2">Booking Request Sent!</h2>
        <p className="mb-4">
          Thank you for your request. Redirecting to home page in {countdown}{" "}
          seconds.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-purple-700 hover:bg-purple-900 text-white px-6 py-2 rounded-md transition"
        >
          Go to Home Page Now
        </button>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center max-h-[90vh] overflow-y-auto">
        <CloseButton />
        <div className="text-red-600 text-4xl mb-4">✗</div>
        <h2 className="text-2xl font-bold mb-2">Failed to Send</h2>
        <p className="mb-4">{errorMsg}</p>
        <button
          onClick={resetForm}
          className="bg-purple-700 hover:bg-purple-900 text-white px-6 py-2 rounded-md transition"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
      <CloseButton />
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        {text || "Book a One-on-One Session"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholder="Enter your name"
            className={`${inputBaseStyle} ${
              errors.name ? errorStyle : validStyle
            }`}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: false }));
            }}
            placeholder="Enter your email"
            className={`${inputBaseStyle} ${
              errors.email ? errorStyle : validStyle
            }`}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Message</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message)
                setErrors((prev) => ({ ...prev, message: false }));
            }}
            placeholder="Write your message..."
            className={`${inputBaseStyle} resize-none min-h-[120px] ${
              errors.message ? errorStyle : validStyle
            }`}
          ></textarea>
        </div>

        {errorMsg && (
          <p className="text-red-600 mb-4 font-semibold">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-900 transition disabled:opacity-50"
        >
          {status === "sending" ? (
            "Sending..."
          ) : (
            <span className="flex items-center justify-center gap-2">
              Send Booking Request <SendIcon size={18} />
            </span>
          )}
        </button>
      </form>

      <ExtraButtons />
    </section>
  );
}
