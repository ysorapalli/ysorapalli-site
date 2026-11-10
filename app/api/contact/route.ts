import { contactForm } from "@/content/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend it worked.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const message = str(body.message, 5000);
  const topicRaw = str(body.topic, 60);
  const topic = (contactForm.topics as readonly string[]).includes(topicRaw)
    ? topicRaw
    : contactForm.defaultTopic;

  if (!name || !message || !EMAIL_RE.test(email)) {
    return Response.json(
      { error: "Please add your name, a valid email and a message." },
      { status: 400 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "That's a lot of notes. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const key = process.env.RESEND_API_KEY;
  if (
    !key ||
    !process.env.CONTACT_FROM_EMAIL ||
    !process.env.CONTACT_TO_EMAIL
  ) {
    // TODO: configure verified server-only delivery settings before enabling delivery.
    return Response.json(
      {
        error:
          "Note delivery is not available yet. Please connect on LinkedIn.",
      },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `[portfolio] ${topic} · ${name}`,
      text: `${message}\n\n---\nFrom: ${name} <${email}>\nTopic: ${topic}`,
    }),
  }).catch((err: unknown) => {
    console.error("[contact] Resend request failed:", err);
    return null;
  });

  if (!res || !res.ok) {
    // Log Resend's reason (e.g. unverified sender) server-side; visitors get the generic message.
    if (res) {
      console.error(
        `[contact] Resend rejected the note (${res.status}):`,
        await res.text().catch(() => ""),
      );
    }
    return Response.json(
      { error: "Couldn't send right now. Please try again later." },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
