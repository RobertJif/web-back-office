<template>
  <div class="about">
    <v-card>
      <v-card-actions class="title"
        >{{ $t("affiliateManagement.title") }}
      </v-card-actions>
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
              <v-btn color="primary" small @click="openCreateDialog()">{{
                $t("label.create")
              }}</v-btn>
            </template>
            <template v-slot:item.name="{ item }">
              {{ `${item.firstname} ${item.lastname}` }}
            </template>
            <template v-slot:item.index="{ item }">
              {{ item.index + 1 }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn color="warning" small @click="openUpdateDialog(item.id)">{{
                $t("label.update")
              }}</v-btn
              >&nbsp;<v-btn
                color="error"
                small
                @click="openDeleteDialog(item.id)"
                >{{ $t("label.delete") }}</v-btn
              >
            </template>
          </v-data-table>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AffiliateManagement",
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
          mustSort: false,
        },
        data: [],
        dataCount: 0,
        windowSize: {
          x: 0,
          y: 0,
        },
      },
      flags: {
        isAffiliateTableLoading: false,
      },
    };
  },
  methods: {
    openCreateDialog() {},
    openDeleteDialog(affId) {},
    openUpdateDialog(affId) {},
    getAffiliateList() {
      this.flags.isAffiliateTableLoading = true;
      const params = {
        page: this.affiliates.options.page,
        limit: this.affiliates.options.itemsPerPage,
      };
      this.axios
        .get("backoffice/affiliate", { params })
        .then((response) => {
          this.affiliates.data = response.data.rows;
          this.affiliates.dataCount = response.data.count;
        })
        .catch((error) => {
          console.log(error.response.message);
        })
        .finally(() => {
          this.flags.isAffiliateTableLoading = false;
        });
    },
    onResize() {
      this.affiliates.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight,
      };
    },
  },
  mounted() {
    this.onResize();
    this.getAffiliateList();
  },
  computed: {
    affiliateTableList() {
      return this.affiliates.data.map((obj, index) => ({
        ...obj,
        index,
      }));
    },
    affiliateTableHeaders() {
      return [
        {
          text: this.$t("affiliateManagement.tableHeader.no"),
          align: "start",
          sortable: false,
          value: "index",
        },
        {
          text: this.$t("affiliateManagement.tableHeader.code"),
          align: "start",
          sortable: false,
          value: "code",
        },
        {
          text: this.$t("affiliateManagement.tableHeader.name"),
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: this.$t("affiliateManagement.tableHeader.email"),
          align: "start",
          sortable: false,
          value: "email",
        },
        {
          text: this.$t("affiliateManagement.tableHeader.phone"),
          align: "start",
          sortable: false,
          value: "phone",
        },
        {
          text: this.$t("affiliateManagement.tableHeader.actions"),
          align: "start",
          sortable: false,
          value: "actions",
        },
      ];
    },
  },
};
</script>
