import api from "./axios";

const TeamAPI = {
  getAll: async () => {
    const res = await api.get("/team");
    // console.log(res)
    return res.data;

  },
};

export default TeamAPI;