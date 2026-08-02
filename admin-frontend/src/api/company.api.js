import api from "./axios";

const CompanyAPI = {

    getAll: () => api.get("/companies"),

    create: (data) => api.post("/companies", data),

    update: (id, data) => api.put(`/companies/${id}`, data),

    delete: (id) => api.delete(`/companies/${id}`),
};

export default CompanyAPI;