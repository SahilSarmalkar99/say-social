import Logo from "../models/Logo.js";

/* =========================================================
   CREATE LOGO
========================================================= */

export const createLogo = async (req, res) => {
  try {
    const { name, cloudUri, alt, carousel = "top" } = req.body;

    if (!cloudUri || !cloudUri.trim()) {
      return res.status(400).json({
        success: false,
        message: "cloudUri is required",
      });
    }

    if (!["top", "bottom"].includes(carousel)) {
      return res.status(400).json({
        success: false,
        message: "Carousel must be either top or bottom",
      });
    }

    /* ---------------------------------------------
       Check 20-logo limit
    --------------------------------------------- */

    const currentCount = await Logo.countDocuments({
      carousel,
    });

    if (currentCount >= 20) {
      return res.status(400).json({
        success: false,
        message: `The ${carousel} carousel already has 20 logos.`,
      });
    }

    const logo = await Logo.create({
      name,
      cloudUri,
      alt,
      carousel,
    });

    res.status(201).json({
      success: true,
      data: logo,
    });
  } catch (error) {
    console.error("Create logo error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   GET ACTIVE LOGOS
   Public API
========================================================= */

export const getLogos = async (req, res) => {
  try {
    const logos = await Logo.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    const top = logos.filter((logo) => logo.carousel === "top");

    const bottom = logos.filter((logo) => logo.carousel === "bottom");

    res.json({
      success: true,

      data: {
        top,
        bottom,
      },

      counts: {
        top: top.length,
        bottom: bottom.length,
      },
    });
  } catch (error) {
    console.error("Get logos error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   GET ALL LOGOS
   Admin API
========================================================= */

export const getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find().sort({
      createdAt: -1,
    });

    const top = logos.filter((logo) => logo.carousel === "top");

    const bottom = logos.filter((logo) => logo.carousel === "bottom");

    res.json({
      success: true,

      data: logos,

      counts: {
        top: top.length,
        bottom: bottom.length,
      },

      limits: {
        top: 20,
        bottom: 20,
      },
    });
  } catch (error) {
    console.error("Get all logos error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   UPDATE LOGO
========================================================= */

export const updateLogo = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params.id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Logo not found",
      });
    }

    const { name, cloudUri, alt, carousel, isActive } = req.body;

    /* ---------------------------------------------
       Validate carousel if provided
    --------------------------------------------- */

    if (carousel !== undefined && !["top", "bottom"].includes(carousel)) {
      return res.status(400).json({
        success: false,
        message: "Carousel must be either top or bottom",
      });
    }

    /* ---------------------------------------------
       If moving to another carousel,
       check 20-logo limit
    --------------------------------------------- */

    if (carousel && carousel !== logo.carousel) {
      const newCarouselCount = await Logo.countDocuments({
        carousel,
        _id: { $ne: logo._id },
      });

      if (newCarouselCount >= 20) {
        return res.status(400).json({
          success: false,
          message: `The ${carousel} carousel already has 20 logos.`,
        });
      }
    }

    /* ---------------------------------------------
       Update only provided fields
    --------------------------------------------- */

    if (name !== undefined) {
      logo.name = name;
    }

    if (cloudUri !== undefined) {
      logo.cloudUri = cloudUri;
    }

    if (alt !== undefined) {
      logo.alt = alt;
    }

    if (carousel !== undefined) {
      logo.carousel = carousel;
    }

    if (isActive !== undefined) {
      logo.isActive = isActive;
    }

    await logo.save();

    res.json({
      success: true,
      data: logo,
    });
  } catch (error) {
    console.error("Update logo error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   DELETE LOGO
========================================================= */

export const deleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findByIdAndDelete(req.params.id);

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Logo not found",
      });
    }

    res.json({
      success: true,
      message: "Logo deleted",
    });
  } catch (error) {
    console.error("Delete logo error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
