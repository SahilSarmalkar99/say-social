import axios from "./axios";

class CategoryAPI {
  getAll() {
    return axios.get("/categories");
  }

  getById(id) {
    return axios.get(`/categories/${id}`);
  }

  create(data) {
    return axios.post("/categories", data);
  }

  update(id, data) {
    return axios.put(`/categories/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/categories/${id}`);
  }
}

export default new CategoryAPI();