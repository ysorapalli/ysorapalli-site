"use client";

import { useState, type FormEvent } from "react";
import { contactForm as form, site } from "@/content/site";
import { ArrowRightIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export default function ContactForm() {
  const [topic, setTopic] = useState(form.defaultTopic);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? ""), // honeypot
      topic,
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; fallback?: string };
      if (data.fallback === "mailto") {
        // Email delivery isn't configured (or failed): hand off to the visitor's mail app.
        const subject = encodeURIComponent(`${topic} · ${payload.name}`);
        const body = encodeURIComponent(`${payload.message}\n\n${payload.name}\n${payload.email}`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("mailto");
        return;
      }
      setError(data.error ?? "Something went wrong. Please try again, or email me directly.");
      setStatus("error");
    } catch {
      setError("Couldn't reach the server. Please try again, or email me directly.");
      setStatus("error");
    }
  }

  if (status === "sent" || status === "mailto") {
    return (
      <div className="sent" role="status">
        <span className="micro" style={{ color: "var(--accent)" }}>{status === "sent" ? "Sent" : "Almost there"}</span>
        <span style={{ fontSize: 15, lineHeight: 1.6 }}>
          {status === "sent" ? form.sent : "Your email app should open with the note ready to send."}
        </span>
        <button type="button" className="sent__btn" onClick={() => setStatus("idle")}>Send another</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <label className="field">
        Name
        <input className="input" name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Your name" />
      </label>
      <label className="field">
        Email
        <input className="input" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="you@example.com" />
      </label>
      <div className="field" role="group" aria-label="What is it about?">
        <span>What&apos;s it about?</span>
        <div className="topics">
          {form.topics.map((t) => (
            <button key={t} type="button" className="topic" aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <label className="field">
        Message
        <textarea className="input" name="message" rows={5} required maxLength={5000} placeholder={form.messagePlaceholder} />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this empty
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" && <p className="form__error" role="alert">{error}</p>}
      <button type="submit" className="btn btn--accent" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send note"} <ArrowRightIcon />
      </button>
    </form>
  );
}
