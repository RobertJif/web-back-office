<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      :mini-variant="$vuetify.breakpoint.lgAndUp"
      hide-overlay
      :expand-on-hover="$vuetify.breakpoint.lgAndUp"
    >
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" link :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Backoffice</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon>mdi-translate</v-icon>&nbsp;
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(locale, index) in $store.state.locales"
            :key="index"
            @click="ChangeActiveLanguage(locale.code)"
          >
            <v-list-item-title>{{ locale.lang }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <!--User Profile Dropdown-->
      <v-menu v-model="flags.accountMenu" :close-on-content-click="false" :nudge-height="100">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            {{$t("base.account")}}
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{username}}</v-list-item-title>
                <v-list-item-subtitle>{{$t("base.backofficeUser")}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list dense subheader>
            <v-list-item-group color="primary">
              <v-list-item @click="logout()">
                <v-list-item-avatar>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{$t("base.logout")}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container class="pa-1 ma-0">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "DefaultContainer",
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    flags: {
      accountMenu: false
    }
  }),
  methods: {
    logout() {
      this.$store.dispatch("REMOVE_USER_DATA").then(() => {
        this.$router.push({ path: "/login" });
      });
    }
  },
  mounted() {},
  computed: {
    username() {
      return localStorage.getItem("username");
    },
    items() {
      return [
        {
          icon: "mdi-home",
          text: "Home",
          link: "/",
          name: "Home"
        },
        {
          icon: "mdi-history",
          text: "Management",
          link: "management",
          name: "Management"
        },
        {
          icon: "mdi-contacts",
          text: "About",
          link: "about",
          name: "About"
        }
      ];
    }
  }
};
</script>

<style scoped>
.empty {
}
</style>