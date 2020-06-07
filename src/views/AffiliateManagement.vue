<template>
  <div class="affiliate-management">
    <v-card>
      <v-card-actions class="title">
        {{ $t("affiliateManagement.title") }}&nbsp;
        <v-btn small color="primary" icon @click="flags.isFilterMenuOpen = !flags.isFilterMenuOpen">
          <v-icon small>mdi-filter-menu</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="flags.isFilterMenuOpen">
          <v-divider></v-divider>

          <v-card-text>
            <v-row dense>
              <v-col md="3" sm="3" cols="12">
                <v-text-field
                  id="affCode"
                  :label="$t('fields.affCode')"
                  name="affCode"
                  dense
                  type="text"
                  v-model="filter.code"
                  clearable
                  @click:clear="getAffiliateList"
                  @keypress.enter="getAffiliateList"
                ></v-text-field>
              </v-col>
              <v-col md="3" sm="3" cols="12">
                <v-text-field
                  id="firstname"
                  :label="$t('fields.firstname')"
                  name="firstname"
                  dense
                  type="text"
                  v-model="filter.firstname"
                  clearable
                  @click:clear="getAffiliateList"
                  @keypress.enter="getAffiliateList"
                ></v-text-field>
              </v-col>
              <v-col md="3" sm="3" cols="12">
                <v-text-field
                  id="lastname"
                  :label="$t('fields.lastname')"
                  name="lastname"
                  dense
                  type="text"
                  v-model="filter.lastname"
                  clearable
                  @click:clear="getAffiliateList"
                  @keypress.enter="getAffiliateList"
                ></v-text-field>
              </v-col>
              <v-col md="3" sm="3" cols="12">
                <v-text-field
                  id="email"
                  :label="$t('fields.email')"
                  name="email"
                  dense
                  type="text"
                  v-model="filter.email"
                  clearable
                  @click:clear="getAffiliateList"
                  @keypress.enter="getAffiliateList"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col class="text-right">
                <v-btn color="primary" small @click="getAffiliateList">{{$t("label.search")}}</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </div>
      </v-expand-transition>

      <v-card-text>
        <v-layout v-resize="onResize" column>
          <v-data-table
            :items="affiliateTableList"
            :options.sync="affiliates.options"
            :server-items-length="affiliates.dataCount"
            :headers="affiliateTableHeaders"
            :height="affiliates.windowSize.y - 210"
            :loading="flags.isAffiliateTableLoading"
            :fixed-header="true"
            multi-sort
          >
            <template v-slot:top>
              <v-btn color="primary" small @click="openCreateDialog">
                {{
                $t("label.create")
                }}
              </v-btn>
            </template>
            <template v-slot:item.firstname="{ item }">{{ `${item.firstname} ${item.lastname}` }}</template>
            <template v-slot:item.index="{ item }">{{ item.index + 1 }}</template>
            <template v-slot:item.actions="{ item }">
              <v-btn color="warning" small @click="openUpdateDialog(item.id)">
                {{
                $t("label.update")
                }}
              </v-btn>&nbsp;
              <v-btn
                color="error"
                small
                @click="openDeleteDialog(item.id, item.code)"
              >{{ $t("label.delete") }}</v-btn>
            </template>
          </v-data-table>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="flags.isCreateDialogOpen"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary" class="pa-0 ma-0 fullscreen-toolbar-header">
          <v-btn icon @click="flags.isCreateDialogOpen = false">
            <v-icon left>mdi-arrow-left-thick</v-icon>
          </v-btn>
          {{$t("affiliateManagement.create.title")}}
        </v-toolbar>
        <v-card-text class="pa-2 ma-0">
          <v-row dense>
            <v-col>
              <affiliate-create v-if="flags.isCreateDialogOpen" :closeDialog="closeDialog" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="flags.isUpdateDialogOpen"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary" class="pa-0 ma-0 fullscreen-toolbar-header">
          <v-btn icon @click="flags.isUpdateDialogOpen = false">
            <v-icon left>mdi-arrow-left-thick</v-icon>
          </v-btn>
          {{$t("affiliateManagement.update.title")}}
        </v-toolbar>
        <v-card-text class="pa-2 ma-0">
          <v-row dense>
            <v-col>
              <affiliate-update
                v-if="flags.isUpdateDialogOpen"
                :id="childData.updateId"
                :closeDialog="closeDialog"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="flags.isDeleteDialogOpen" max-width="290">
      <v-card>
        <v-card-title class="headline">{{$t("label.delete")}}</v-card-title>

        <v-card-text v-html="$t('dialog.askDelete', {item: deleteDialog.deleteAffCode})"></v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            :loading="flags.isDeleteBeingProcess"
            text
            @click="flags.isDeleteDialogOpen = false"
          >{{$t("label.cancel")}}</v-btn>

          <v-btn
            color="primary"
            text
            @click="remove"
            :loading="flags.isDeleteBeingProcess"
          >{{$t("label.delete")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AffiliateCreate from "../components/affiliate-management/AffiliateCreate";
import AffiliateUpdate from "../components/affiliate-management/AffiliateUpdate";

export default {
  name: "AffiliateManagement",
  components: {
    AffiliateCreate,
    AffiliateUpdate
  },
  data: () => {
    return {
      filter: {
        code: "",
        firstname: "",
        lastname: "",
        email: ""
      },
      affiliates: {
        options: {
          page: 1,
          itemsPerPage: 5,
          sortBy: [],
          sortDesc: [],
          groupBy: [],
          groupDesc: [],
          multiSort: false,
          mustSort: false
        },
        data: [],
        dataCount: 0,
        windowSize: {
          x: 0,
          y: 0
        }
      },
      childData: {
        updateId: -1
      },
      deleteDialog: {
        deleteId: -1,
        deleteAffCode: ""
      },
      flags: {
        isCreateDialogOpen: false,
        isUpdateDialogOpen: false,
        isDeleteDialogOpen: false,
        isAffiliateTableLoading: false,
        isFilterMenuOpen: false,
        isDeleteBeingProcess: false
      }
    };
  },
  watch: {
    "affiliates.options": function(newVal, oldVal) {
      this.getAffiliateList();
    }
  },
  methods: {
    remove() {
      this.flags.isDeleteBeingProcess = true;
      this.axios
        .delete(`backoffice/affiliate/${this.deleteDialog.deleteId}`)
        .then(response => {
          this.toast(
            this.$t("success.itemDeleted", {
              itemName: this.$t("label.affiliate")
            }),
            "success"
          );

          this.flags.isDeleteBeingProcess = false;
          this.flags.isDeleteDialogOpen = false;
          this.getAffiliateList();
        })
        .catch(error => {
          console.log(error);
          this.toast(this.$t("error.response.data"), "error");
        });
    },
    closeDialog(name) {
      switch (name) {
        case "create":
          this.flags.isCreateDialogOpen = false;
          break;
        case "update":
          this.flags.isUpdateDialogOpen = false;
          break;
      }
      this.getAffiliateList();
    },
    openCreateDialog() {
      this.flags.isCreateDialogOpen = true;
    },
    openDeleteDialog(affId, affCode) {
      this.deleteDialog.deleteId = affId;
      this.deleteDialog.deleteAffCode = affCode;

      this.flags.isDeleteDialogOpen = true;
    },
    openUpdateDialog(affId) {
      this.childData.updateId = affId;
      this.flags.isUpdateDialogOpen = true;
    },
    getAffiliateList() {
      this.flags.isAffiliateTableLoading = true;

      const params = {
        page: this.affiliates.options.page,
        limit: this.affiliates.options.itemsPerPage,
        filter: this.filter,
        order: [
          ...this.affiliates.options.sortBy,
          ...this.affiliates.options.sortDesc.map(s => (s ? "DESC" : "ASC"))
        ]
      };

      this.axios
        .get("backoffice/affiliate", { params })
        .then(response => {
          this.affiliates.data = response.data.rows;
          this.affiliates.dataCount = response.data.count;
        })
        .catch(error => {
          console.log(error.response.message);
        })
        .finally(() => {
          this.flags.isAffiliateTableLoading = false;
        });
    },
    onResize() {
      this.affiliates.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
      };
    }
  },
  mounted() {
    this.onResize();
  },
  computed: {
    affiliateTableList() {
      return this.affiliates.data.map((obj, index) => ({
        ...obj,
        index
      }));
    },
    affiliateTableHeaders() {
      return [
        {
          text: this.$t("affiliateManagement.tableHeader.no"),
          align: "start",
          sortable: false,
          value: "index"
        },
        {
          text: this.$t("affiliateManagement.tableHeader.code"),
          align: "start",
          sortable: true,
          value: "code"
        },
        {
          text: this.$t("affiliateManagement.tableHeader.name"),
          align: "start",
          sortable: true,
          value: "firstname"
        },
        {
          text: this.$t("affiliateManagement.tableHeader.email"),
          align: "start",
          sortable: true,
          value: "email"
        },
        {
          text: this.$t("affiliateManagement.tableHeader.phone"),
          align: "start",
          sortable: true,
          value: "phone"
        },
        {
          text: this.$t("affiliateManagement.tableHeader.actions"),
          align: "start",
          sortable: false,
          value: "actions"
        }
      ];
    }
  }
};
</script>