<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" flat>
          <v-row no-gutters>
            <v-col>
              <v-toolbar-title>
                {{
                $t("login.backofficeLogin")
                }}
              </v-toolbar-title>
            </v-col>
            <v-col class="text-right">
              <v-menu open-on-hover offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn text v-on="on">{{ $i18n.locale }}</v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(locale, index) in locales"
                    :key="index"
                    @click="changeLocale(locale)"
                  >
                    <v-list-item-title>
                      {{
                      locale.toUpperCase()
                      }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-toolbar>
        <validation-observer ref="observer" v-slot="{ valid }">
          <form>
            <v-card-text>
              <validation-provider name="username" rules="required" v-slot="{ errors }">
                <v-text-field
                  id="username"
                  :label="$t('base.username')"
                  name="username"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="formData.username"
                  required
                  :error-messages="errors"
                  @keypress.enter="login(valid)"
                ></v-text-field>
              </validation-provider>

              <validation-provider name="password" rules="required" v-slot="{ errors }">
                <v-text-field
                  id="password"
                  :label="$t('base.password')"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="formData.password"
                  required
                  :error-messages="errors"
                  @keypress.enter="login(valid)"
                ></v-text-field>
              </validation-provider>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login(valid)">
                {{
                $t("label.login")
                }}
              </v-btn>
            </v-card-actions>
          </form>
        </validation-observer>
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
        username: "",
        password: ""
      },
      flags: {
        formValid: false
      }
    };
  },
  methods: {
    login(isValid) {
      if (isValid) {
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
            console.log(error);
            this.toast(error.response.data, "error");
          });
      } else {
        this.$refs.observer.validate();
      }
    }
  }
};
</script>
