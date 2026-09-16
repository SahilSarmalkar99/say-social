import nodemailer from "nodemailer";

const required = ["MAIL_USER", "MAIL_PASS"];

export function isEmailConfigured() {
  return (
    required.every((key) => Boolean(process.env[key])) &&
    Boolean(
      process.env.CONTACT_EMAIL ||
      process.env.ADMIN_EMAIL ||
      process.env.CAREERS_EMAIL
    )
  );
}

export function createTransporter() {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error(
      "Email service is not configured. Set MAIL_USER and MAIL_PASS."
    );
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT || 465),
    secure:
      process.env.MAIL_SECURE !== undefined
        ? process.env.MAIL_SECURE === "true"
        : true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

export async function sendEmail(options) {
  const transporter = createTransporter();

  return transporter.sendMail({
    from:
      process.env.MAIL_FROM ||
      `"SAY Social" <${process.env.MAIL_USER}>`,
    ...options,
  });
}

export async function verifyEmailConnection() {
  const transporter = createTransporter();

  await transporter.verify();

  return true;
}