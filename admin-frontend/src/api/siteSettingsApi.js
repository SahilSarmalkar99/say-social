import api from "./axios";

export const getSiteSettings = () => api.get("/site-settings");
export const updateSiteSettings = (payload) => api.put("/site-settings", payload);
