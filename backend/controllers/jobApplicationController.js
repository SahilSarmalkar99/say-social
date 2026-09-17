import fs from "fs";
import path from "path";
import { sendEmail } from "../services/emailService.js";
import JobRole from "../models/JobRole.js";
import JobApplication from "../models/JobApplication.js";
import CareerSetting from "../models/CareerSetting.js";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";

export async function submitApplication(req, res) {
  let cloudinaryFile = null;

  try {
    const { jobRoleId, name, phone, email, workLinks } = req.body;

    // ------------------------------------
    // VALIDATION
    // ------------------------------------

    if (!jobRoleId || !name || !phone || !req.file) {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).json({
        success: false,
        message: "Job role, name, phone and resume are required",
      });
    }

    // ------------------------------------
    // FIND JOB
    // ------------------------------------

    const job = await JobRole.findOne({
      _id: jobRoleId,
      isActive: true,
    });

    if (!job) {
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(404).json({
        success: false,
        message: "Selected job role is no longer available",
      });
    }

    // ------------------------------------
    // PARSE WORK LINKS
    // ------------------------------------

    const links =
      typeof workLinks === "string"
        ? workLinks
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean)
        : [];


    const isPdf = req.file.mimetype === "application/pdf";
// ------------------------------------
// CLOUDINARY UPLOAD
// ------------------------------------

console.log("========================================");
console.log("UPLOADING RESUME TO CLOUDINARY");
console.log("========================================");

console.log({
  originalName: req.file.originalname,
  mimetype: req.file.mimetype,
  size: req.file.size,
  localPath: req.file.path,
});

try {
 const timestamp = Math.floor(Date.now() / 1000);
const folder = "saysocial/careers/resumes";

// Cloudinary signed upload signature
const signatureParams = `folder=${folder}&timestamp=${timestamp}`;

const signature = crypto
  .createHash("sha1")
  .update(
    signatureParams + process.env.CLOUDINARY_API_SECRET
  )
  .digest("hex");

const fileBuffer = fs.readFileSync(req.file.path);

const formData = new FormData();

formData.append(
  "file",
  new Blob([fileBuffer], {
    type: req.file.mimetype,
  }),
  req.file.originalname
);

formData.append(
  "api_key",
  process.env.CLOUDINARY_API_KEY
);

formData.append(
  "timestamp",
  String(timestamp)
);

formData.append(
  "folder",
  folder
);

formData.append(
  "signature",
  signature
);

const uploadUrl =
  `https://api.cloudinary.com/v1_1/` +
  `${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`;

console.log("========================================");
console.log("DIRECT CLOUDINARY UPLOAD");
console.log("========================================");

console.log({
  uploadUrl,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKeyExists: Boolean(process.env.CLOUDINARY_API_KEY),
  secretExists: Boolean(process.env.CLOUDINARY_API_SECRET),
  timestamp,
  folder,
  filename: req.file.originalname,
  mimetype: req.file.mimetype,
});

const cloudinaryResponse = await fetch(
  uploadUrl,
  {
    method: "POST",
    body: formData,
  }
);

const responseText =
  await cloudinaryResponse.text();

console.log("========================================");
console.log("CLOUDINARY HTTP RESPONSE");
console.log("========================================");

console.log("STATUS:", cloudinaryResponse.status);
console.log(
  "STATUS TEXT:",
  cloudinaryResponse.statusText
);

console.log(
  "X-Cld-Error:",
  cloudinaryResponse.headers.get("x-cld-error")
);

console.log(
  "X-Request-Id:",
  cloudinaryResponse.headers.get("x-request-id")
);

console.log("BODY:", responseText);

if (!cloudinaryResponse.ok) {
  throw new Error(
    `Cloudinary upload failed (${cloudinaryResponse.status}): ${responseText}`
  );
}

cloudinaryFile = JSON.parse(responseText);

console.log("========================================");
console.log("CLOUDINARY UPLOAD SUCCESS");
console.log("========================================");

console.log({
  public_id: cloudinaryFile.public_id,
  secure_url: cloudinaryFile.secure_url,
  resource_type: cloudinaryFile.resource_type,
  format: cloudinaryFile.format,
  bytes: cloudinaryFile.bytes,
});

  

} catch (cloudinaryError) {
  console.error("========================================");
  console.error("CLOUDINARY UPLOAD FAILED");
  console.error("========================================");

  console.error({
    message: cloudinaryError.message,
    name: cloudinaryError.name,
    http_code: cloudinaryError.http_code,
    response: cloudinaryError.response,
  });

  if (req.file?.path && fs.existsSync(req.file.path)) {
    try {
      fs.unlinkSync(req.file.path);
    } catch (cleanupError) {
      console.error("Resume cleanup failed:", cleanupError);
    }
  }

  return res.status(500).json({
    success: false,
    message: "Resume upload failed",
    error: cloudinaryError.message,
  });
}

    // ------------------------------------
    // VERIFY CLOUDINARY RESPONSE
    // ------------------------------------

    console.log("========================================");
    console.log("CLOUDINARY UPLOAD RESULT");
    console.log("========================================");

    console.log({
      public_id: cloudinaryFile?.public_id,
      secure_url: cloudinaryFile?.secure_url,
      resource_type: cloudinaryFile?.resource_type,
      format: cloudinaryFile?.format,
      bytes: cloudinaryFile?.bytes,
    });

    if (
      !cloudinaryFile ||
      !cloudinaryFile.public_id ||
      !cloudinaryFile.secure_url
    ) {
      console.error(
        "Cloudinary upload returned an invalid response:",
        cloudinaryFile
      );

      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(500).json({
        success: false,
        message: "Resume uploaded but Cloudinary did not return a valid URL.",
      });
    }

    // ------------------------------------
    // DELETE TEMPORARY LOCAL FILE
    // ------------------------------------

    if (req.file?.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log("Temporary resume deleted.");
      } catch (cleanupError) {
        console.error(
          "Temporary resume cleanup failed:",
          cleanupError
        );
      }
    }

    // ------------------------------------
    // BUILD RESUME OBJECT
    // ------------------------------------

    const resumeData = {
      originalName: req.file.originalname,
      filename: cloudinaryFile.public_id,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: cloudinaryFile.secure_url,
      url: cloudinaryFile.secure_url,
      publicId: cloudinaryFile.public_id,
    };

    console.log("========================================");
    console.log("RESUME DATA TO MONGODB");
    console.log("========================================");

    console.log(resumeData);

    // ------------------------------------
    // SAVE APPLICATION
    // ------------------------------------

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

    // ------------------------------------
    // EMAIL CONFIGURATION
    // ------------------------------------

    const setting = await CareerSetting.findOne().sort({
      createdAt: -1,
    });

    const recipient =
      setting?.applicationEmail ||
      process.env.CAREERS_EMAIL ||
      "business@saysocial.in";

    let emailDelivered = false;
    let confirmationDelivered = false;

    // ------------------------------------
    // SEND ADMIN EMAIL
    // ------------------------------------

    if (
      recipient &&
      process.env.MAIL_USER &&
      process.env.MAIL_PASS
    ) {
      try {
        await sendEmail({
          to: recipient,

          replyTo: email || process.env.MAIL_USER,

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
${cloudinaryFile.secure_url}
          `,

          attachments: [
            {
              filename: req.file.originalname,
              path: cloudinaryFile.secure_url,
            },
          ],
        });

        emailDelivered = true;

        console.log(
          `Application email sent successfully to ${recipient}`
        );
      } catch (emailError) {
        console.error(
          "APPLICATION EMAIL FAILED:",
          emailError
        );
      }
    } else {
      console.warn(
        "Email not configured. Application was saved without email notification."
      );
    }

    // ------------------------------------
    // SEND APPLICANT CONFIRMATION
    // ------------------------------------

    if (
      email &&
      process.env.MAIL_USER &&
      process.env.MAIL_PASS
    ) {
      try {
        await sendEmail({
          to: email,

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

            <p>
              Regards,<br/>
              Say Social
            </p>
          `,
        });

        confirmationDelivered = true;

        console.log(
          `Confirmation email sent successfully to ${email}`
        );
      } catch (confirmationError) {
        console.error(
          "CONFIRMATION EMAIL FAILED:",
          confirmationError
        );
      }
    }

    // ------------------------------------
    // RESPONSE
    // ------------------------------------

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
    console.error("========================================");
    console.error("APPLICATION SUBMISSION ERROR");
    console.error("========================================");
    console.error(error);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error(
          "Resume cleanup failed:",
          cleanupError
        );
      }
    }

    return res.status(500).json({
      success: false,
      message:
        error.message || "Could not submit application.",
    });
  }
}
export async function getApplications(req, res) {
  try {
    res.json({
      success: true,
      data: await JobApplication.find()
        .populate("jobRole", "title type location")
        .sort({ createdAt: -1 }),
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
}
export async function updateApplicationStatus(req, res) {
  try {
    const app = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );
    if (!app)
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    res.json({ success: true, data: app });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
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
