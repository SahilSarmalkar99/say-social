import nodemailer from "nodemailer";

export function isEmailConfigured() {
  return Boolean(
    process.env.MAIL_HOST &&
    process.env.MAIL_PORT &&
    process.env.MAIL_USER &&
    process.env.MAIL_PASS &&
    process.env.MAIL_FROM
  );
}

export function createTransporter() {
  if (!isEmailConfigured()) {
    throw new Error(
      "Email service is not configured. Check MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS and MAIL_FROM."
    );
  }

  console.log("SMTP CONFIG:", {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  from: process.env.MAIL_FROM,
});

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,

    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

export async function sendEmail(options) {
  const transporter = createTransporter();

  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    ...options,
  });
}
export async function verifyEmailConnection() {
  const transporter = createTransporter();

  await transporter.verify();

  return true;
}