import axios from "./axios";

class SubCategoryAPI {
  getAll() {
    return axios.get("/sub-categories");
  }

  getById(id) {
    return axios.get(`/sub-categories/${id}`);
  }

  create(data) {
    return axios.post("/sub-categories", data);
  }

  update(id, data) {
    return axios.put(`/sub-categories/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/sub-categories/${id}`);
  }
}

export default new SubCategoryAPI();