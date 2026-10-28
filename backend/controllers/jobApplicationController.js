
import fs from "fs";
import ImageKit from "@imagekit/nodejs";

import { sendEmail } from "../services/emailService.js";
import JobRole from "../models/JobRole.js";
import JobApplication from "../models/JobApplication.js";
import CareerSetting from "../models/CareerSetting.js";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const RESUME_FOLDER = "/saysocial/careers/resumes";

const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

// ========================================
// HELPER FUNCTIONS
// ========================================

function deleteTemporaryFile(filePath) {
  if (!filePath) return;

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Temporary file cleanup failed:", error.message);
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

// ========================================
// SUBMIT JOB APPLICATION
// ========================================

export async function submitApplication(req, res) {
  let imagekitFile = null;

  try {
    const { jobRoleId, name, phone, email, workLinks } = req.body;

    // Validate required fields
    if (
      !jobRoleId ||
      !name?.trim() ||
      !phone?.trim() ||
      !req.file
    ) {
      deleteTemporaryFile(req.file?.path);

      return res.status(400).json({
        success: false,
        message: "Job role, name, phone and resume are required",
      });
    }

    // Validate ImageKit configuration
    if (
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      !process.env.IMAGEKIT_PUBLIC_KEY ||
      !process.env.IMAGEKIT_URL_ENDPOINT
    ) {
      deleteTemporaryFile(req.file.path);

      return res.status(500).json({
        success: false,
        message: "ImageKit environment variables are missing",
      });
    }

    // Validate resume type
    if (!ALLOWED_RESUME_TYPES.has(req.file.mimetype)) {
      deleteTemporaryFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Resume must be a PDF, DOC or DOCX file",
      });
    }

    // Validate the active job role
    const job = await JobRole.findOne({
      _id: jobRoleId,
      isActive: true,
    });

    if (!job) {
      deleteTemporaryFile(req.file.path);

      return res.status(404).json({
        success: false,
        message: "Selected job role is no longer available",
      });
    }

    // Parse work links
    const links =
      typeof workLinks === "string"
        ? workLinks
            .split("\n")
            .map((link) => link.trim())
            .filter(Boolean)
        : [];

    const originalName = req.file.originalname;
    const mimetype = req.file.mimetype;
    const fileSize = req.file.size;

    // ========================================
    // UPLOAD RESUME TO IMAGEKIT
    // ========================================

    console.log("Uploading resume to ImageKit:", {
      originalName,
      mimetype,
      size: fileSize,
    });

    try {
      imagekitFile = await imagekit.files.upload({
        file: fs.createReadStream(req.file.path),
        fileName: originalName,
        folder: RESUME_FOLDER,
        useUniqueFileName: true,
      });

      if (!imagekitFile?.fileId || !imagekitFile?.url) {
        throw new Error(
          "ImageKit did not return a valid file ID and URL"
        );
      }

      console.log("ImageKit upload successful:", {
        fileId: imagekitFile.fileId,
        url: imagekitFile.url,
        filePath: imagekitFile.filePath,
      });
    } catch (uploadError) {
      console.error("ImageKit upload failed:", uploadError);

      deleteTemporaryFile(req.file.path);

      return res.status(500).json({
        success: false,
        message: "Resume upload failed",
        error: uploadError.message,
      });
    }

    // Remove temporary local file
    deleteTemporaryFile(req.file.path);

    // ========================================
    // PREPARE RESUME DATA
    // Preserve existing MongoDB field names
    // ========================================

    const resumeData = {
      originalName,
      filename: imagekitFile.name,
      mimetype,
      size: fileSize,
      path: imagekitFile.url,
      url: imagekitFile.url,
      publicId: imagekitFile.fileId,
    };

    // ========================================
    // SAVE APPLICATION TO MONGODB
    // ========================================

    const application = await JobApplication.create({
      jobRole: job._id,
      jobTitle: job.title,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim().toLowerCase() || "",
      workLinks: links,
      resume: resumeData,
    });

    console.log("Application saved:", application._id);

    // ========================================
    // EMAIL CONFIGURATION
    // ========================================

    const setting = await CareerSetting.findOne().sort({
      createdAt: -1,
    });

    const recipient =
      setting?.applicationEmail ||
      process.env.CAREERS_EMAIL ||
      "business@saysocial.in";

    let emailDelivered = false;
    let confirmationDelivered = false;

    // ========================================
    // SEND ADMIN EMAIL
    // ========================================

    if (
      recipient &&
      process.env.MAIL_USER &&
      process.env.MAIL_PASS
    ) {
      try {
        await sendEmail({
          to: recipient,
          replyTo: email?.trim() || process.env.MAIL_USER,
          subject: `New Application: ${job.title} — ${name}`,

          text: `
New job application

Role: ${job.title}
Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

Work links:
${links.length ? links.join("\n") : "None"}

Resume:
${imagekitFile.url}
          `,

          attachments: [
            {
              filename: originalName,
              path: imagekitFile.url,
            },
          ],
        });

        emailDelivered = true;

        console.log(
          `Application email sent successfully to ${recipient}`
        );
      } catch (emailError) {
        console.error("APPLICATION EMAIL FAILED:", emailError);
      }
    } else {
      console.warn(
        "Email is not configured. Application saved without admin notification."
      );
    }

    // ========================================
    // SEND APPLICANT CONFIRMATION
    // ========================================

    const applicantEmail = email?.trim().toLowerCase();

    if (
      applicantEmail &&
      process.env.MAIL_USER &&
      process.env.MAIL_PASS
    ) {
      try {
        await sendEmail({
          to: applicantEmail,
          subject: `Application received — ${job.title}`,

          text: `Hi ${name},

Thanks for applying for ${job.title} at Say Social.

We received your application and will review it.

Regards,
Say Social`,

          html: `
            <p>Hi ${escapeHtml(name)},</p>
            <p>
              Thanks for applying for
              <strong>${escapeHtml(job.title)}</strong>
              at Say Social.
            </p>
            <p>
              We received your application and will review it.
            </p>
            <p>Regards,<br/>Say Social</p>
          `,
        });

        confirmationDelivered = true;

        console.log(
          `Confirmation email sent successfully to ${applicantEmail}`
        );
      } catch (confirmationError) {
        console.error(
          "CONFIRMATION EMAIL FAILED:",
          confirmationError
        );
      }
    }

    // ========================================
    // RESPONSE
    // ========================================

    let message;

    if (emailDelivered && confirmationDelivered) {
      message =
        "Application submitted successfully. A confirmation email has been sent.";
    } else if (emailDelivered) {
      message =
        "Application submitted successfully. Our team has received your application.";
    } else {
      message =
        "Application submitted successfully. Email notification is temporarily unavailable.";
    }

    return res.status(201).json({
      success: true,
      message,
      data: application,
    });
  } catch (error) {
    console.error("APPLICATION SUBMISSION ERROR:", error);

    deleteTemporaryFile(req.file?.path);

    return res.status(500).json({
      success: false,
      message: "Could not submit application.",
    });
  }
}

// ========================================
// GET ALL APPLICATIONS
// ========================================

export async function getApplications(req, res) {
  try {
    const applications = await JobApplication.find()
      .populate("jobRole", "title type location")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("GET APPLICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// ========================================
// UPDATE APPLICATION STATUS
// ========================================

export async function updateApplicationStatus(req, res) {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("UPDATE APPLICATION STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
