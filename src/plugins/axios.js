import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
