import api from "./axios";

const ProjectAPI = {
  getAll: async () => {
    const res = await api.get("/project");
    // console.log("All : " , res.data);
    return res.data 
}
,
getBySlug: async (slug) => {
    const res = await api.get(`/project/slug/${slug}`)
    // console.log("Single : " , res.data);
return res.data ; },
};

export default ProjectAPI;