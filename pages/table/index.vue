<template>
  <div>
    <v-row>
      <v-col cols="12">
      <div class="display-1 font-weight-bold">{{ $t("table.title") }}</div>
      </v-col>
      <template v-for="item in tables">
        <v-col :key="item.name" cols="2" class="ma-5">
          <c-table-item :item="item"/>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import CTableItem from '../../components/table/CTableItem.vue';
export default {
  components: {
    CTableItem
  },
  data() {
    return {
      tables: []
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      try {
        this.$fire.database.ref("table").on("value", snapshot => {
          this.tables = []
          snapshot.forEach(doc => {
            this.tables.push({
              key: doc.key,
              name: doc.val().name,
              status: doc.val().status,
              user_name: doc.val().user_name ? doc.val().user_name : ""
            });
          })
        });
      } catch (error) {
        this.$notyf.error({
          message: error,
          icon: false,
          dismissible: true
        });
      }
    },
  }
};
</script>
<style></style>
