import SiteSetting from "../models/SiteSetting.js";

const isValidHttpUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const normalizePayload = (body = {}) => ({
  heroVideos: {
    work: body.heroVideos?.work?.trim?.() || "",
    team: body.heroVideos?.team?.trim?.() || "",
    contact: body.heroVideos?.contact?.trim?.() || "",
  },
  logoUrl: body.logoUrl?.trim?.() || "",
});

const validatePayload = ({ heroVideos, logoUrl }) => {
  const urls = [
    ["Work hero video URL", heroVideos.work],
    ["Team hero video URL", heroVideos.team],
    ["Contact hero video URL", heroVideos.contact],
    ["Logo URL", logoUrl],
  ];

  for (const [label, value] of urls) {
    if (value && !isValidHttpUrl(value)) {
      return `${label} must be a valid HTTP/HTTPS URL`;
    }
  }

  return null;
};

export const getSiteSettings = async (req, res) => {
  try {
    const settings = await SiteSetting.findOne({ key: "global" }).lean();

    res.json({
      success: true,
      data: settings || {
        key: "global",
        heroVideos: { work: "", team: "", contact: "" },
        logoUrl: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch site settings",
      error: error.message,
    });
  }
};

export const updateSiteSettings = async (req, res) => {
  try {
    const payload = normalizePayload(req.body);
    const validationError = validatePayload(payload);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const settings = await SiteSetting.findOneAndUpdate(
      { key: "global" },
      { $set: payload, $setOnInsert: { key: "global" } },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Site settings updated successfully",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update site settings",
      error: error.message,
    });
  }
};
