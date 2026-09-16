import ContactInquiry from "../models/ContactInquiry.js";
import { sendEmail } from "../services/emailService.js";

const clean = (value, max = 5000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function submitContactInquiry(req, res) {
  try {
    const name = clean(req.body.name, 120);
    const email = clean(req.body.email, 254).toLowerCase();
    const phone = clean(req.body.phone, 40);
    const reason = clean(req.body.reason, 200);
    const message = clean(req.body.message, 5000);

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      reason,
      message,
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.CAREERS_EMAIL;
    if (!adminEmail) {
      return res.status(500).json({
        success: false,
        message: "Admin email is not configured.",
      });
    }

    // 1. Send the inquiry to the admin.
    await sendEmail({
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Inquiry — ${name}`,
      text: [
        "New contact inquiry",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Reason: ${reason || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Reason:</strong> ${escapeHtml(reason || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    // 2. Send an acknowledgement to the user.
    await sendEmail({
      to: email,
      subject: "We received your inquiry — Say Social",
      text: `Hi ${name},\n\nThanks for reaching out to Say Social. We received your inquiry and will get back to you soon.\n\nRegards,\nSay Social`,
      html: `
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for reaching out to Say Social.</p>
        <p>We received your inquiry and will get back to you soon.</p>
        <p>Regards,<br/>Say Social</p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been sent successfully. We will get back to you soon.",
      data: { id: inquiry._id },
    });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({
      success: false,
      message: "We could not send your inquiry right now. Please try again.",
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
