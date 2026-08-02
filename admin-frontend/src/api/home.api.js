import api from "./axios";

const HomeAPI = {
  create: (data) => api.post("/home", data),

  getAll: () => api.get("/home"),

  getBySection: (section) => api.get(`/home/section/${section}`),

  update: (id, data) => api.put(`/home/${id}`, data),

  remove: (id) => api.delete(`/home/${id}`),
};

export default HomeAPI;
