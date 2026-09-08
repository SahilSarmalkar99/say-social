import api from "./axios";

// Logos
export const getLogos = () => api.get("/logos");

// Testimonials
export const getTestimonials = () => api.get("/testimonials");
