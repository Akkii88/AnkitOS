import { Router } from "express";
import { Resend } from "resend";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    req.log.error("RESEND_API_KEY is not set");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "AnkitOS <onboarding@resend.dev>",
      to: "ankitdabur08@gmail.com",
      subject: `[AnkitOS] ${subject}`,
      html: `
        <h2>New message from AnkitOS Portfolio</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send email");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
