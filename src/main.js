import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from "./plugins/axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import gb_mixin from "./mixins/global_mixin";
import "./plugins/vee-validate";

import "./assets/css/main.css"

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.mixin(gb_mixin);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
