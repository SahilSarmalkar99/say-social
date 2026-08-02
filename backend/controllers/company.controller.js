import Company from "../models/company.model.js";

/**
 * Create Company
 */
export const createCompany = async (req, res) => {
  try {
    const { name, category, subCategory } = req.body;

    const exists = await Company.findOne({
      name,
      category,
      subCategory,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const company = await Company.create({
      name,
      category,
      subCategory,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * Get All Companies
 */
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort({ name: 1 });

    return res.status(200).json({
      success: true,
      count: companies.length,
      data: companies,
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
export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate("category", "name")
      .populate("subCategory", "name");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.json({
      success: true,
      data: company,
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
export const updateCompany = async (req, res) => {
  try {
    const { name, category, subCategory } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        subCategory,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("category", "name")
      .populate("subCategory", "name");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.json({
      success: true,
      message: "Company updated successfully",
      data: company,
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
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};