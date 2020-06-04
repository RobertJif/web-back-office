import store from "../store/index";

export default {
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
    logout() {
      this.$store.dispatch("REMOVE_USER_DATA").then(() => {
        this.$router.push({ path: "/login" });
      });
    },
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
