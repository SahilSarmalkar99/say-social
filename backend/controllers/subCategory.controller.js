import SubCategory from "../models/subCategory.model.js";

/**
 * Create Sub Category
 */
export const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    const exists = await SubCategory.findOne({
      name,
      category,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Sub Category already exists",
      });
    }

    const subCategory = await SubCategory.create({
      name,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Sub Category created successfully",
      data: subCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get All
 */
export const getSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.find()
      .populate("category", "name")
      .sort({ name: 1 });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get One
 */
export const getSubCategory = async (req, res) => {
  try {
    const data = await SubCategory.findById(req.params.id)
      .populate("category", "name");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sub Category not found",
      });
    }

    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Update
 */
export const updateSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    const data = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("category", "name");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sub Category not found",
      });
    }

    return res.json({
      success: true,
      message: "Updated successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Delete
 */
export const deleteSubCategory = async (req, res) => {
  try {
    const data = await SubCategory.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sub Category not found",
      });
    }

    return res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};