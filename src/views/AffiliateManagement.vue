<template>
  <div class="affiliate-management">
    <v-card>
      <v-card-actions class="title">{{ $t("affiliateManagement.title") }}</v-card-actions>
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
          >
            <template v-slot:top>
              <v-btn color="primary" small @click="openCreateDialog">
                {{
                $t("label.create")
                }}
              </v-btn>
            </template>
            <template v-slot:item.name="{ item }">{{ `${item.firstname} ${item.lastname}` }}</template>
            <template v-slot:item.index="{ item }">{{ item.index + 1 }}</template>
            <template v-slot:item.actions="{ item }">
              <v-btn color="warning" small @click="openUpdateDialog(item.id)">
                {{
                $t("label.update")
                }}
              </v-btn>&nbsp;
              <v-btn color="error" small @click="openDeleteDialog(item.id)">{{ $t("label.delete") }}</v-btn>
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
              <affiliate-create :closeDialog="closeDialog" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AffiliateCreate from "../components/affiliate-management/AffiliateCreate";

export default {
  name: "AffiliateManagement",
  components: {
    AffiliateCreate
  },
  data: () => {
    return {
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
      flags: {
        isCreateDialogOpen: false,
        isAffiliateTableLoading: false,
        isUpdateDialogOpen: false
      }
    };
  },
  methods: {
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
    openDeleteDialog(affId) {},
    openUpdateDialog(affId) {},
    getAffiliateList() {
      this.flags.isAffiliateTableLoading = true;
      const params = {
        page: this.affiliates.options.page,
        limit: this.affiliates.options.itemsPerPage
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
    this.getAffiliateList();
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
          sortable: false,
          value: "code"
        },
        {
          text: this.$t("affiliateManagement.tableHeader.name"),
          align: "start",
          sortable: false,
          value: "name"
        },
        {
          text: this.$t("affiliateManagement.tableHeader.email"),
          align: "start",
          sortable: false,
          value: "email"
        },
        {
          text: this.$t("affiliateManagement.tableHeader.phone"),
          align: "start",
          sortable: false,
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