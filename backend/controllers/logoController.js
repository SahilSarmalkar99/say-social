import Logo from "../models/Logo.js";

export const createLogo = async (req, res) => {
  try {
    const { name, cloudUri, alt } = req.body;

    if (!cloudUri) {
      return res.status(400).json({
        success: false,
        message: "cloudUri is required",
      });
    }

    const logo = await Logo.create({
      name,
      cloudUri,
      alt,
    });

    res.status(201).json({
      success: true,
      data: logo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLogos = async (req, res) => {
  try {
    const logos = await Logo.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: logos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: logos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLogo = async (req, res) => {
  try {
    const logo = await Logo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!logo) {
      return res.status(404).json({
        success: false,
        message: "Logo not found",
      });
    }

    res.json({
      success: true,
      data: logo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
