"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Send as SendIcon } from "lucide-react";

// Use a more specific interface name for clarity
interface ContactUsProps {
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

export default function ContactUs({
  onClose,
  text,
  isVisible,
}: ContactUsProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [countdown, setCountdown] = useState<number>(6);

  // Memoize resetForm to safely include it in the useEffect dependency array
  const resetForm = useCallback((): void => {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
    setErrors({});
    setCountdown(6); // Reset countdown for the next submission
  }, []);

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      onClose();
      resetForm(); // Reset the form state after closing
    }
  }, [status, countdown, onClose, resetForm]);

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

  // A reusable button for closing the modal
  const CloseButton = () => (
    <button
      type="button" // Important for buttons inside a form that shouldn't submit
      aria-label="Close form"
      onClick={onClose}
      className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-800 z-50"
    >
      <X size={20} />
    </button>
  );

  if (!isVisible) return null;

  // Success State View
  if (status === "success") {
    return (
      <section
        className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center max-h-[90vh] overflow-y-auto"
        aria-modal="true"
        role="dialog"
        aria-labelledby="contact-success-title"
      >
        <CloseButton />
        <div className="text-green-600 text-4xl mb-4" aria-hidden="true">
          ✓
        </div>
        <h2 id="contact-success-title" className="text-2xl font-bold mb-2">
          Message Sent!
        </h2>
        <p className="mb-4">
          Thank you! We&#39;ll be in touch soon. Closing in {countdown} seconds.
        </p>
        <button
          type="button"
          onClick={() => {
            onClose();
            resetForm();
          }}
          className="bg-purple-700 hover:bg-purple-900 text-white px-6 py-2 rounded-md transition"
        >
          Close Now
        </button>
      </section>
    );
  }

  // Error State View
  if (status === "error") {
    return (
      <section
        className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center max-h-[90vh] overflow-y-auto"
        aria-modal="true"
        role="dialog"
        aria-labelledby="contact-error-title"
      >
        <CloseButton />
        <div className="text-red-600 text-4xl mb-4" aria-hidden="true">
          ✗
        </div>
        <h2 id="contact-error-title" className="text-2xl font-bold mb-2">
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

  // Default Form View
  return (
    <section
      className="relative max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto"
      aria-modal="true"
      role="dialog"
      aria-labelledby="contact-form-title"
    >
      <CloseButton />
      <h2
        id="contact-form-title"
        className="text-3xl font-bold text-primary mb-6 text-center"
      >
        {text || "Send us a message"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
        <div>
          <label className="block mb-2 font-medium" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
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
          <label className="block mb-2 font-medium" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
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
          <label className="block mb-2 font-medium" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
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
          <p role="alert" className="text-red-600 font-semibold">
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
              Send Message
              <SendIcon size={18} />
            </span>
          )}
        </button>
      </form>
    </section>
  );
}
