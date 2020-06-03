<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" flat>
          <v-toolbar-title>Backoffice Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              v-model="formData.username"
            ></v-text-field>

            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="formData.password"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login()">{{$t("label.login")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data: () => {
    return {
      formData: {
        username: "borobert",
        password: "Robert123"
      }
    };
  },
  methods: {
    login() {
      this.axios
        .post("signin", this.formData)
        .then(response => {
          this.$store
            .dispatch("UPDATE_USER_DATA", response.data)
            .then(response => {
              this.$router.push({ path: "/" });
            });
        })
        .catch(error => {
          console.log(error.response.data);
          this.$store.dispatch("UPDATE_SNACKBAR", {
            text: error.response.data,
            color: "error",
            active: true
          });
        });
    }
  }
};
</script>