import api from "./axios";

export const submitContactInquiry = (payload) =>
  api.post("/contact", payload);
