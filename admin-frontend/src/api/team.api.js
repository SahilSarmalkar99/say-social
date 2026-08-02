import axios from "./axios";

class TeamAPI {
  getTeam() {
    return axios.get("/team");
  }

  updateVideo(video) {
    return axios.put("/team/video", {
      video,
    });
  }

  deleteVideo() {
    return axios.delete("/team/video");
  }

  addMember(data) {
    return axios.post("/team/member", data);
  }

  updateMember(memberId, data) {
    return axios.put(`/team/member/${memberId}`, data);
  }

  deleteMember(memberId) {
    return axios.delete(`/team/member/${memberId}`);
  }
}

export default new TeamAPI();
