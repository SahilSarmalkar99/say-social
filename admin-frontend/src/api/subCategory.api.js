import api from "./axios";

const SubCategoryAPI = {
  getAll: () => api.get("/sub-categories"),

  getById: (id) => api.get(`/sub-categories/${id}`),

  create: (data) => api.post("/sub-categories", data),

  update: (id, data) => api.put(`/sub-categories/${id}`, data),

  remove: (id) => api.delete(`/sub-categories/${id}`),
};

export default SubCategoryAPI;