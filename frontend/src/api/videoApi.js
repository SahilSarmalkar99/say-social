import api from "./axios";

export const getMainVideo = async () => {
  const response = await api.get("/videos/main");
  return response.data;
};

export const getCarouselVideos = async () => {
  const response = await api.get("/videos/carousel");
  return response.data;
};