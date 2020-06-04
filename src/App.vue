<template>
  <v-app>
    <v-snackbar
      v-model="$store.getters.snackbar.active"
      :color="$store.getters.snackbar.color"
    >{{ $t($store.getters.snackbar.text) }}</v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

