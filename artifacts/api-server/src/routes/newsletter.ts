import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

const subscribers = new Map<string, { name: string; email: string; prefs: string[]; subscribedAt: string }>();

const TOPIC_LABELS: Record<string, string> = {
  vehicles: "Vehicle Releases",
  software: "Software Updates",
  energy: "Energy & Solar",
  charging: "Charging Network",
  events: "Events & Test Drives",
  offers: "Exclusive Offers",
};

router.post("/subscribe", async (req, res) => {
  const { email, name, prefs } = req.body as { email?: string; name?: string; prefs?: string[] };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }

  const record = {
    name: (name || "").trim(),
    email: email.trim().toLowerCase(),
    prefs: Array.isArray(prefs) ? prefs : [],
    subscribedAt: new Date().toISOString(),
  };

  subscribers.set(record.email, record);
  req.log.info({ email: record.email, prefs: record.prefs }, "Newsletter subscribe");

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || "no-reply@tesla.com";

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: smtpUser, pass: smtpPass },
      });

      const prefsList = record.prefs.map((p) => `• ${TOPIC_LABELS[p] || p}`).join("\n") || "• All Tesla Updates";

      await transporter.sendMail({
        from: `Tesla <${smtpFrom}>`,
        to: record.email,
        subject: "Welcome to Tesla — You're In",
        text: `Hi ${record.name || "there"},\n\nWelcome to Tesla! You're now subscribed to updates on:\n\n${prefsList}\n\n— Tesla Team`,
        html: `
          <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff">
            <div style="background:#171a20;padding:28px 32px;text-align:center">
              <div style="font-size:13px;font-weight:700;letter-spacing:0.22em;color:#fff">TESLA</div>
              <div style="font-size:12px;color:rgba(255,255,255,.4);margin-top:4px">Membership Confirmed</div>
            </div>
            <div style="padding:36px 32px">
              <h1 style="font-size:26px;font-weight:700;color:#171a20;margin-bottom:12px">
                Welcome${record.name ? `, ${record.name}` : ""}! 🎉
              </h1>
              <p style="color:#5c5e62;font-size:15px;line-height:1.65;margin-bottom:24px">
                You're now subscribed to Tesla updates. Here's what you'll receive:
              </p>
              <div style="background:#f8f8f8;border-radius:10px;padding:20px;margin-bottom:24px">
                ${record.prefs.map((p) => `<div style="padding:6px 0;font-size:14px;color:#171a20">✓ ${TOPIC_LABELS[p] || p}</div>`).join("") || '<div style="padding:6px 0;font-size:14px;color:#171a20">✓ All Tesla Updates</div>'}
              </div>
              <div style="text-align:center">
                <a href="https://tesla.com" style="display:inline-block;padding:13px 36px;border-radius:4px;background:#171a20;color:#fff;font-size:14px;font-weight:600;text-decoration:none">Go to Tesla</a>
              </div>
            </div>
            <div style="background:#f8f8f8;border-top:1px solid #eee;padding:20px 32px;text-align:center;font-size:11px;color:#aaa">
              © 2026 Tesla, Inc. · <a href="#" style="color:#aaa">Unsubscribe</a>
            </div>
          </div>
        `,
      });

      req.log.info({ to: record.email }, "Welcome email sent");
    } catch (err) {
      req.log.warn({ err }, "Email send failed — subscription still recorded");
    }
  } else {
    logger.info({ email: record.email }, "Newsletter subscribe (no SMTP configured)");
  }

  res.json({ success: true, message: "Subscribed successfully" });
});

router.get("/stats", (_req, res) => {
  res.json({ count: subscribers.size });
});

export default router;
