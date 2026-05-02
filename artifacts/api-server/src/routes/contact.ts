import { Router } from "express";
import { logger } from "../lib/logger";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, phone, subject, vehicle, message } = req.body as {
    name?: string; email?: string; phone?: string; subject?: string; vehicle?: string; message?: string;
  };

  if (!email || !name || !message) {
    res.status(400).json({ error: "Name, email, and message are required" });
    return;
  }

  req.log.info({ name, email, subject, vehicle }, "Contact form submission");

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || "no-reply@tesla.com";
  const contactTo = process.env.CONTACT_EMAIL || smtpUser;

  if (smtpHost && smtpUser && smtpPass && contactTo) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `Tesla Contact Form <${smtpFrom}>`,
        to: contactTo,
        replyTo: email,
        subject: `[Tesla Contact] ${subject || "General"} — ${name}`,
        text: `From: ${name} <${email}>\nPhone: ${phone || "N/A"}\nSubject: ${subject}\nVehicle: ${vehicle || "N/A"}\n\n${message}`,
      });

      await transporter.sendMail({
        from: `Tesla <${smtpFrom}>`,
        to: email,
        subject: "We received your message — Tesla",
        html: `
          <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#171a20;padding:24px 32px;text-align:center">
              <div style="font-size:13px;font-weight:700;letter-spacing:0.22em;color:#fff">TESLA</div>
            </div>
            <div style="padding:36px 32px">
              <h1 style="font-size:22px;font-weight:700;color:#171a20;margin-bottom:12px">We got your message!</h1>
              <p style="color:#5c5e62;font-size:14px;line-height:1.65">Hi ${name}, thank you for reaching out. Our team will respond to <strong>${email}</strong> within 24 hours.</p>
              <p style="color:#9a9a9a;font-size:13px;margin-top:16px">For urgent help, call <strong>1-877-798-3752</strong>.</p>
            </div>
          </div>
        `,
      });

      req.log.info({ to: email }, "Contact confirmation sent");
    } catch (err) {
      req.log.warn({ err }, "Contact email send failed");
    }
  } else {
    logger.info({ name, email, subject }, "Contact form (no SMTP configured)");
  }

  res.json({ success: true });
});

export default router;
