import api from "./axios";

// Logos
export const createLogo = (payload) => api.post("/logos", payload);
export const getLogos = () => api.get("/logos");
export const getAllLogos = () => api.get("/logos/admin");
export const updateLogo = (id, payload) => api.put(`/logos/${id}`, payload);
export const deleteLogo = (id) => api.delete(`/logos/${id}`);

// Testimonials
export const createTestimonial = (payload) => api.post("/testimonials", payload);
export const getTestimonials = () => api.get("/testimonials");
export const getAllTestimonials = () => api.get("/testimonials/admin");
export const updateTestimonial = (id, payload) => api.put(`/testimonials/${id}`, payload);
export const deleteTestimonial = (id) => api.delete(`/testimonials/${id}`);