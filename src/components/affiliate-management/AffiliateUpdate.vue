<template>
  <validation-observer ref="observer" v-slot="{ valid }">
    <v-form>
      <v-row dense>
        <v-col>
          <v-card color="secondary">
            <v-card-actions>{{$t("affiliateManagement.update.accountInformation")}}</v-card-actions>
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
                      @keypress.enter="update(valid)"
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
            <v-card-actions>{{$t("affiliateManagement.update.personalInformation")}}</v-card-actions>
            <v-card-text class="form-card-text">
              <v-row dense>
                <v-col>
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
                      @keypress.enter="update(valid)"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col>
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
                      @keypress.enter="update(valid)"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
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
                      @keypress.enter="update(valid)"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col>
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
                      @keypress.enter="update(valid)"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="text-right">
          <v-btn color="primary" @click="update(valid)">{{$t("label.save")}}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </validation-observer>
</template>

<script>
export default {
  name: "AffiliateCreate",
  props: {
    closeDialog: Function,
    id: [Number, String]
  },
  data: () => {
    return {
      formData: {
        code: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
      }
    };
  },
  mounted() {
    this.getAffiliateById();
  },
  methods: {
    getAffiliateById() {
      this.axios
        .get(`backoffice/affiliate/${this.id}`)
        .then(response => {
          this.formData = response.data;
        })
        .catch(error => {
          console.log(error);
          this.toast(this.$t("error.response.data"), "error");
          this.closeDialog("update");
        });
    },
    update(isValid) {
      if (isValid) {
        this.axios
          .put(`backoffice/affiliate/${this.id}`, this.formData)
          .then(response => {
            this.toast(
              this.$t("success.itemUpdated", {
                itemName: this.$t("label.affiliate")
              }),
              "success"
            );
            this.closeDialog("update");
          })
          .catch(error => {
            console.log(error);
            this.toast(this.$t("error.response.data"), "error");
          });
      } else {
        this.$refs.observer.validate();
      }
    }
  }
};
</script>
