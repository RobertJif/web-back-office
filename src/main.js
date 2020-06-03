import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import gb_mixin from './mixins/global_mixin'
import { secureAxios, baseAxios } from "./plugins/axios"

Vue.config.productionTip = false;


axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common = {
  'Authorization': `bearer ${localStorage.getItem('accessToken')}`
};

Vue.use(VueAxios, axios)

Vue.mixin(gb_mixin)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
