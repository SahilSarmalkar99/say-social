import Home from "../models/home.model.js";

/**
 * Create Home
 */

export const createHome = async (req, res) => {
  try {
    const { section } = req.body;

    const alreadyExists = await Home.findOne({ section });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "This section already exists.",
      });
    }

    const home = await Home.create(req.body);

    res.status(201).json({
      success: true,
      message: "Section created successfully.",
      data: home,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get All Sections
 */

export const getAllHome = async (req, res) => {
  try {
    const homes = await Home.find()
      .populate("videos.subCategory")
      .populate("videos.company")
      .populate("workCategories.category")
      .populate("workCategories.videos.subCategory")
      .populate("workCategories.videos.company")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: homes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get Section By Name
 */

export const getHomeBySection = async (req, res) => {
  try {
    const home = await Home.findOne({
      section: req.params.section,
    })
      .populate("videos.subCategory")
      .populate("videos.company")

      .populate("workCategories.category")
      .populate("workCategories.videos.subCategory")
      .populate("workCategories.videos.company");

    if (!home) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.json({
      success: true,
      data: home,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Update Section
 */

export const updateHome = async (req, res) => {
  try {
    const home = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!home) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.json({
      success: true,
      message: "Updated successfully",
      data: home,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Delete Section
 */

export const deleteHome = async (req, res) => {
  try {
    const home = await Home.findByIdAndDelete(req.params.id);

    if (!home) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
