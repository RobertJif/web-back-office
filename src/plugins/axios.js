import store from "../store/index";
import i18n from "./i18n"
import axios from "axios";
import router from "../router/index"

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

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status !== 401) return Promise.reject(error);

  store.dispatch("UPDATE_SNACKBAR", {
    text: i18n.t(error.response.data),
    color: "error",
    active: true
  });

  store.dispatch("REMOVE_USER_DATA").then(() => {
    router.push({ path: "/login" });
  });

});

export default instance;
