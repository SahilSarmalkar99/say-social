
import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import ImageKit from "@imagekit/nodejs";
import { sendEmail } from "./services/emailService.js";

const PORT = process.env.PORT || 5000;

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Generate secure ImageKit upload credentials
app.get("/api/imagekit/auth", (req, res) => {
  try {
    if (!process.env.IMAGEKIT_PUBLIC_KEY ||
        !process.env.IMAGEKIT_PRIVATE_KEY) {
      return res.status(500).json({
        success: false,
        message: "ImageKit credentials are missing",
      });
    }

    const auth = imagekit.helper.getAuthenticationParameters();

    res.json({
      success: true,
      ...auth,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error("IMAGEKIT AUTH ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate ImageKit authentication",
    });
  }
});

// Test ImageKit configuration
app.get("/api/test-imagekit", (req, res) => {
  const configured =
    Boolean(process.env.IMAGEKIT_PUBLIC_KEY) &&
    Boolean(process.env.IMAGEKIT_PRIVATE_KEY) &&
    Boolean(process.env.IMAGEKIT_URL_ENDPOINT);

  res.status(configured ? 200 : 500).json({
    success: configured,
    message: configured
      ? "ImageKit environment variables are configured"
      : "ImageKit environment variables are missing",
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || null,
  });
});

// Test email
app.get("/api/test-email", async (req, res) => {
  try {
    const info = await sendEmail({
      to: "business@saysocial.in",
      subject: "SAY Social Email Test",
      text: "This is a test email from the SAY Social backend.",
      html: `
        <h2>SAY Social Email Test</h2>
        <p>If you received this email, Gmail + Nodemailer is working correctly.</p>
      `,
    });

    console.log("TEST EMAIL SENT:", info.messageId);

    res.json({
      success: true,
      message: "Test email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("TEST EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server Failed to Start");
    console.error(error);
  }
};

startServer();
