import api from "./axios";

const HomeAPI = {
  getAll: async () => {
    const res = await api.get("/home");
    // console.log(res.data)
    return res.data;
  },
};

export default HomeAPI;