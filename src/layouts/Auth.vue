<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      :right="$vuetify.rtl"
      :mini-variant="$vuetify.breakpoint.lgAndUp"
      hide-overlay
      :expand-on-hover="$vuetify.breakpoint.lgAndUp"
    >
      <v-list dense>
        <v-list-item
          v-for="navi in navigations"
          :key="navi.text"
          link
          :to="navi.link"
        >
          <v-list-item-action>
            <v-icon>{{ navi.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ navi.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Backoffice</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">{{ $i18n.locale }}</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(locale, index) in locales"
            :key="index"
            @click="changeLocale(locale)"
          >
            <v-list-item-title>{{ locale.toUpperCase() }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <!--User Profile Dropdown-->
      <v-menu
        v-model="flags.accountMenu"
        :close-on-content-click="false"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list class="pa-0 ma-0">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ username }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  $t("base.backofficeUser")
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item-group color="primary">
              <v-list-item @click="logout()" class="pa-0 ma-0">
                <v-list-item-avatar class="pa-0 ma-0">
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-avatar>
                <v-list-item-content class="pa-0 ma-0">
                  <v-list-item-title>{{ $t("base.logout") }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container class="pa-1 ma-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "DefaultContainer",
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    flags: {
      accountMenu: false,
    },
  }),
  methods: {},
  mounted() {},
  computed: {
    navigations() {
      return [
        {
          icon: "mdi-home",
          text: this.$t("navigation.home"),
          link: "/",
          name: "Home",
        },
        {
          icon: "mdi-account-supervisor",
          text: this.$t("navigation.affiliateManagement"),
          link: "affiliate-management",
          name: "AffiliateManagement",
        },
      ];
    },
  },
};
</script>

<style scoped>
.empty {
}
</style>
