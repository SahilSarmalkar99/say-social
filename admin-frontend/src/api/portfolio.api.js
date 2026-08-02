import axios from "./axios";

class PortfolioAPI {
  // Get all portfolios
  getAll() {
    return axios.get("/portfolio");
  }

  // Get portfolio by id
  getById(id) {
    return axios.get(`/portfolio/${id}`);
  }

  // Create portfolio
  create(data) {
    return axios.post("/portfolio", data);
  }

  // Update portfolio
  update(id, data) {
    return axios.put(`/portfolio/${id}`, data);
  }

  // Delete portfolio
  delete(id) {
    return axios.delete(`/portfolio/${id}`);
  }

  // Optional: Get portfolios by category
  getByCategory(categoryId) {
    return axios.get(`/portfolio?category=${categoryId}`);
  }

  // Optional: Get portfolios by category and subcategory
  getBySubCategory(categoryId, subCategoryId) {
    return axios.get(
      `/portfolio?category=${categoryId}&subCategory=${subCategoryId}`,
    );
  }

  // Optional: Get category names for frontend tabs
  getCategories() {
    return axios.get("/portfolio/categories");
  }

  // Optional: Get subcategory names for frontend tabs
  getSubCategories(categoryId) {
    return axios.get(`/portfolio/subcategories/${categoryId}`);
  }
}

export default new PortfolioAPI();
