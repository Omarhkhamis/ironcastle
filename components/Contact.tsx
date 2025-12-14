"use client";

import { FormEvent, useState } from "react";

type Props = {
  onNavigate: (target: string) => void;
};

export default function Contact({ onNavigate }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send.");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error?.message || "Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      className="flex min-h-screen items-center bg-gradient-to-br from-white to-[#f3f4f6] px-5 py-16 text-dark md:py-20 dark:from-[#0f1116] dark:via-[#111720] dark:to-[#0d141c] dark:text-white"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-[1.2fr,1fr]">
          <div className="space-y-2">
            <div className="text-sm font-bold uppercase tracking-[0.08em] text-accent">
              Contact
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Send Us a <span className="text-accent">Message</span>
            </h2>
            <p className="text-base text-gray-700 dark:text-gray-200">
              Fill out the form below and our team will get back to you within
              24 hours.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr,1fr]">
          <div className="rounded-[14px] border border-graymid bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <form
              onSubmit={handleSubmit}
              className="grid gap-3 text-gray-700 dark:text-gray-200"
            >
              <div className="grid gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-dark dark:text-white"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  type="text"
                  className="w-full rounded-xl border border-graymid bg-white px-4 py-3 text-base text-dark placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-dark dark:text-white"
                >
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  className="w-full rounded-xl border border-graymid bg-white px-4 py-3 text-base text-dark placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-dark dark:text-white"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full rounded-xl border border-graymid bg-white px-4 py-3 text-base text-dark placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="+971 5X XXX XXXX"
                />
              </div>
              <div className="grid gap-1">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-dark dark:text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="min-h-[140px] w-full rounded-xl border border-graymid bg-white px-4 py-3 text-base text-dark placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-[#111] shadow-accent transition hover:-translate-y-[1px] hover:shadow-accentHover disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? "Sending..." : "Send Request"}
              </button>
              {status === "success" && (
                <p className="text-sm text-green-500">Message sent successfully.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </form>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[14px] border border-graymid bg-white p-4 text-dark shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-[#111]">
                  <i className="fas fa-envelope" aria-hidden />
                </span>
                Email Us
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                Info@ironcastle.ae
              </p>
            </div>

            <div className="rounded-[14px] border border-graymid bg-white p-4 text-dark shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-[#111]">
                  <i className="fas fa-phone" aria-hidden />
                </span>
                Call Us
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                +971 52 230 6357 / +971 52 232 9840
              </p>
            </div>

            <div className="rounded-[14px] border border-graymid bg-white p-4 text-dark shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-[#111]">
                  <i className="fas fa-map-marker-alt" aria-hidden />
                </span>
                Visit Us
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                Al Sajaa_S- INDUSTRIAL - Sharjah UAE
              </p>
            </div>

            <div className="rounded-[14px] border border-graymid bg-white p-4 text-dark shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-[#111]">
                  <i className="fas fa-clock" aria-hidden />
                </span>
                Business Hours
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                Saturday - Thursday
              </p>
              <p className="mt-1 text-gray-700 dark:text-gray-200">
                09:00 AM - 06:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[14px] border border-graymid bg-white p-3 shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div
            className="relative w-full overflow-hidden rounded-[10px]"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.570309776189!2d55.65607142494053!3d25.348822625543193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f38f860e70e9%3A0x5a16b0b28f3ebb4e!2zSXJvbiBDYXN0bGUgTWV0YWwgSW5kdXN0cmllcyBzdHJpZXMgTExDINin2YTZgtmE2LnZhyDYp9mE2K3Yr9mK2K_ZitmHINmE2YTYtdmG2KfYudin2Kog2KfZhNmF2LnYr9mG2YrYqSDYsNmFINmF!5e1!3m2!1sar!2sbe!4v1765736628797!5m2!1sar!2sbe"
              className="absolute left-0 top-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
