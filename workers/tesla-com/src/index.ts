import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

type Env = {
  ASSETS: Fetcher;
  ENVIRONMENT?: string;
  TESLA_NEWSLETTER?: KVNamespace;
  TESLA_CONTACTS?: KVNamespace;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", logger());
app.use(
  "/api/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

app.get("/api/healthz", (c) =>
  c.json({ status: "ok", env: c.env.ENVIRONMENT || "unknown", kv: Boolean(c.env.TESLA_NEWSLETTER) })
);

app.post("/api/newsletter", async (c) => {
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim();
  const prefs: string[] = Array.isArray(body.prefs) ? body.prefs.map(String) : [];
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: "Valid email is required" }, 400);
  }
  const record = { email, name: name || undefined, prefs, joinedAt: new Date().toISOString() };
  if (c.env.TESLA_NEWSLETTER) {
    await c.env.TESLA_NEWSLETTER.put(`sub:${email}`, JSON.stringify(record));
    const listRaw = await c.env.TESLA_NEWSLETTER.get("meta:emails");
    const list: string[] = listRaw ? JSON.parse(listRaw) : [];
    if (!list.includes(email)) {
      list.push(email);
      await c.env.TESLA_NEWSLETTER.put("meta:emails", JSON.stringify(list));
    }
  }
  return c.json({ success: true, message: "Subscribed successfully" });
});

app.get("/api/newsletter/stats", async (c) => {
  if (c.env.TESLA_NEWSLETTER) {
    const listRaw = await c.env.TESLA_NEWSLETTER.get("meta:emails");
    const list: string[] = listRaw ? JSON.parse(listRaw) : [];
    return c.json({ count: list.length });
  }
  return c.json({ count: 0 });
});

app.post("/api/contact", async (c) => {
  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  if (!name || !email || !message) {
    return c.json({ error: "Name, email, and message are required" }, 400);
  }
  const id = `contact:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
  const record = {
    id,
    name,
    email,
    phone: body.phone || "",
    subject: body.subject || "general",
    vehicle: body.vehicle || "",
    message,
    createdAt: new Date().toISOString(),
  };
  // Reuse newsletter KV for contact log if present (single binding)
  if (c.env.TESLA_NEWSLETTER) {
    await c.env.TESLA_NEWSLETTER.put(id, JSON.stringify(record));
  }
  console.log("[contact]", { id, email, subject: record.subject });
  return c.json({ success: true, message: "Message received", id });
});

app.all("*", async (c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
