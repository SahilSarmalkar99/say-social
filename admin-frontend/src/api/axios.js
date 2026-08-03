import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:5000/api",
    baseURL: "https://say-social.onrender.com/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error(error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;