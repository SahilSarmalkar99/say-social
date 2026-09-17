import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();

    // Start Server
    app.listen(PORT, () => {
      console.log(`
 http://localhost:${PORT}
`);
    });
  } catch (error) {
    console.error("Server Failed to Start");
    console.error(error);
  }
};

import { sendEmail } from "./services/emailService.js";

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

app.get("/api/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("CLOUDINARY TEST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      http_code: error.http_code,
    });
  }
});
startServer();
