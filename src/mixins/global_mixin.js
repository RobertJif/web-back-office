import store from "../store/index";

export default {
  methods: {
    changeLocale(locale) {
      localStorage.setItem("locale", locale)
      this.$i18n.locale = locale;
    },
    logout() {
      const params = { username: localStorage.getItem("username") }
      this.axios.delete("signout", { params })
        .then(response => {

          this.$store.dispatch("REMOVE_USER_DATA").then(() => {
            this.$router.push({ path: "/login" });
          });
        })
        .catch(error => {
          this.toast(this.$t(error.response.data), "error")
        })

    },
    toast(text, color, active = true) {
      this.$store.dispatch("UPDATE_SNACKBAR", {
        text: text,
        color: color,
        active: active
      });
    }
  },
  computed: {
    locales() {
      return this.$i18n.availableLocales.filter((s) => s != this.$i18n.locale);
    },
    username() {
      return localStorage.getItem("username");
    },
  },
};
