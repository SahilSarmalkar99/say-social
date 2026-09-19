import api from "./axios";

export const getSiteSettings = async () => {
  const response = await api.get("/site-settings");
  return response.data;
};