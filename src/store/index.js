import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: null,
    auth: localStorage.getItem("accessToken") != null,
    snackbar: {
      active: false,
      color: "success",
      text: "",
    },
  },
  mutations: {
    SET_REFRESH_TOKEN(state, data) {
      localStorage.setItem("refreshToken", data.refreshToken);
    },
    SET_ACCESS_TOKEN(state, data) {
      localStorage.setItem("accessToken", data.accessToken);
    },
    SET_USER_DATA(state, data) {
      localStorage.setItem("username", data.userData.username);
      localStorage.setItem("id", data.userData.id);
    },
    REMOVE_ACCESS_TOKEN(state, data) {
      localStorage.removeItem("accessToken");
    },
    REMOVE_REFRESH_TOKEN(state, data) {
      localStorage.removeItem("refreshToken");
    },
    REMOVE_USER_DATA(state, data) {
      localStorage.removeItem("username");
      localStorage.removeItem("id");
    },
    SET_SNACKBAR_PROPERTIES(state, data) {
      state.snackbar = data;
    },
  },
  actions: {
    REMOVE_USER_DATA({ commit }) {
      return new Promise((resolve) => {
        commit("REMOVE_REFRESH_TOKEN");
        commit("REMOVE_ACCESS_TOKEN");
        commit("REMOVE_USER_DATA");
        resolve();
      });
    },
    UPDATE_USER_DATA({ commit }, data) {
      return new Promise((resolve) => {
        commit("SET_ACCESS_TOKEN", data);
        commit("SET_REFRESH_TOKEN", data);
        commit("SET_USER_DATA", data);

        resolve();
      });
    },
    UPDATE_SNACKBAR({ commit }, data) {
      return new Promise((resolve) => {
        commit("SET_SNACKBAR_PROPERTIES", data);
        resolve();
      });
    },
  },
  getters: {
    auth: (state) => state.auth,
    snackbar: (state) => state.snackbar,
  },
  modules: {},
});
