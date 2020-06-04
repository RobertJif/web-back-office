<template>
  <validation-observer ref="observer" v-slot="{ valid }">
    <v-form>
      <v-row dense>
        <v-col>
          <v-card color="secondary">
            <v-card-actions>{{$t("affiliateManagement.create.accountInformation")}}</v-card-actions>
            <v-card-text class="form-card-text">
              <v-row dense>
                <v-col>
                  <validation-provider name="affCode" rules="required" v-slot="{ errors }">
                    <v-text-field
                      id="affCode"
                      :label="$t('fields.affCode')"
                      name="affCode"
                      dense
                      type="text"
                      v-model="formData.code"
                      required
                      :error-messages="errors"
                      @keypress.enter="create(valid)"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col>
                  <validation-provider
                    name="password"
                    rules="required|min:8|max:16|strongPassword"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      id="password"
                      :label="$t('fields.password')"
                      name="password"
                      dense
                      type="password"
                      v-model="formData.password"
                      required
                      :error-messages="errors"
                      @keypress.enter="create(valid)"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-card color="secondary">
            <v-card-actions>{{$t("affiliateManagement.create.personalInformation")}}</v-card-actions>
            <v-card-text>
              <validation-provider name="firstname" rules="required" v-slot="{ errors }">
                <v-text-field
                  id="firstname"
                  :label="$t('fields.firstname')"
                  name="firstname"
                  dense
                  type="text"
                  v-model="formData.firstname"
                  required
                  :error-messages="errors"
                  @keypress.enter="create(valid)"
                ></v-text-field>
              </validation-provider>

              <validation-provider name="lastname" rules="required" v-slot="{ errors }">
                <v-text-field
                  id="lastname"
                  :label="$t('fields.lastname')"
                  name="lastname"
                  dense
                  type="text"
                  v-model="formData.lastname"
                  required
                  :error-messages="errors"
                  @keypress.enter="create(valid)"
                ></v-text-field>
              </validation-provider>

              <validation-provider name="email" rules="required|email" v-slot="{ errors }">
                <v-text-field
                  id="email"
                  :label="$t('fields.email')"
                  name="email"
                  dense
                  type="text"
                  v-model="formData.email"
                  required
                  :error-messages="errors"
                  @keypress.enter="create(valid)"
                ></v-text-field>
              </validation-provider>

              <validation-provider name="phone" rules="required" v-slot="{ errors }">
                <v-text-field
                  id="phone"
                  :label="$t('fields.phone')"
                  name="phone"
                  dense
                  type="text"
                  v-model="formData.phone"
                  required
                  :error-messages="errors"
                  @keypress.enter="create(valid)"
                ></v-text-field>
              </validation-provider>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="text-right">
          <v-btn color="primary" @click="create(valid)">{{$t("label.submit")}}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </validation-observer>
</template>

<script>
export default {
  name: "AffiliateCreate",
  props: {
    closeDialog: Function
  },
  data: () => {
    return {
      formData: {
        code: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    create(isValid) {
      if (isValid) {
        this.axios
          .post("backoffice/affiliate", this.formData)
          .then(response => {
            this.toast("success.itemCreated", "success");
            this.closeDialog("create");
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
