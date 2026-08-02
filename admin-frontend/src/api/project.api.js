import axios from "./axios";

class ProjectAPI {


  getAll() {
    return axios.get("/project");
  }

  getById(id) {
    return axios.get(`/project/${id}`);
  }


  create(data) {
    return axios.post("/project", data);
  }


  update(id, data) {
    return axios.put(`/project/${id}`, data);
  }


  delete(id) {
    return axios.delete(`/project/${id}`);
  }
}

export default new ProjectAPI();
