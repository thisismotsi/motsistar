"use client";

import { useState, useEffect, useCallback } from "react";
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

type Status = "idle" | "sending" | "success" | "error";

interface FieldErrors {
  name?: boolean;
  email?: boolean;
  message?: boolean;
}

export default function Booking({ onClose, text, isVisible }: BookingProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [countdown, setCountdown] = useState<number>(6);

  const resetForm = useCallback((): void => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
    setErrors({});
    setCountdown(6);
  }, []);

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      // Redirecting on success for this form
      window.location.href = "/";
    }
  }, [status, countdown]);

  const validateFields = (): boolean => {
    const newErrors: FieldErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = true;
    if (!email.trim() || !emailPattern.test(email)) newErrors.email = true;
    if (!message.trim()) newErrors.message = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message || "Failed to send email");
      } else {
        setErrorMsg("An unexpected error occurred");
      }
      setStatus("error");
    }
  };

  const inputBaseStyle =
    "w-full p-3 rounded-md border transition focus:outline-none focus:ring-2";
  const validStyle = "border-purple-500 focus:ring-purple-500";
  const errorStyle = "border-red-600 focus:ring-red-500";

  const CloseButton = () => (
    <button
      type="button"
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
      <section
        className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center max-h-[90vh] overflow-y-auto"
        aria-modal="true"
        role="dialog"
        aria-labelledby="booking-success-title"
      >
        <CloseButton />
        <div className="text-green-600 text-4xl mb-4" aria-hidden="true">
          ✓
        </div>
        <h2 id="booking-success-title" className="text-2xl font-bold mb-2">
          Booking Request Sent!
        </h2>
        <p className="mb-4">
          Thank you for your request. Redirecting to home page in {countdown}{" "}
          seconds.
        </p>
        <button
          type="button"
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
      <section
        className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center max-h-[90vh] overflow-y-auto"
        aria-modal="true"
        role="dialog"
        aria-labelledby="booking-error-title"
      >
        <CloseButton />
        <div className="text-red-600 text-4xl mb-4" aria-hidden="true">
          ✗
        </div>
        <h2 id="booking-error-title" className="text-2xl font-bold mb-2">
          Failed to Send
        </h2>
        <p className="mb-4">{errorMsg}</p>
        <button
          type="button"
          onClick={resetForm}
          className="bg-purple-700 hover:bg-purple-900 text-white px-6 py-2 rounded-md transition"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section
      className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto"
      aria-modal="true"
      role="dialog"
      aria-labelledby="booking-form-title"
    >
      <CloseButton />
      <h2
        id="booking-form-title"
        className="text-3xl font-bold text-primary mb-6 text-center"
      >
        {text || "Book a One-on-One Session"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
        <div>
          <label className="block mb-2 font-medium" htmlFor="booking-name">
            Name
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholder="Enter your name"
            className={`${inputBaseStyle} ${
              errors.name ? errorStyle : validStyle
            }`}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium" htmlFor="booking-email">
            Email
          </label>
          <input
            id="booking-email"
            name="email"
            type="email"
            autoComplete="email"
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
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium" htmlFor="booking-message">
            Message
          </label>
          <textarea
            id="booking-message"
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
            required
          ></textarea>
        </div>

        {errorMsg && (
          <p role="alert" className="text-red-600 mb-4 font-semibold">
            {errorMsg}
          </p>
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
