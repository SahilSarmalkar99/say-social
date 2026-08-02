import axios from "./axios";

class PortfolioAPI {
  // Get all portfolios
  getAll(params = {}) {
    return axios.get("/portfolio", {
      params,
    });
  }

  // Get single portfolio
  getById(id) {
    return axios.get(`/portfolio/${id}`);
  }

  // Create
  create(data) {
    return axios.post("/portfolio", data);
  }

  // Update
  update(id, data) {
    return axios.put(`/portfolio/${id}`, data);
  }

  // Delete
  delete(id) {
    return axios.delete(`/portfolio/${id}`);
  }
}

export default new PortfolioAPI();