<template>
  <div>
    <v-card class="mt-9">
      <div class="display-1 mb-6 font-weight-bold">Lịch sử  chi tiết của  {{name}}</div>
      <v-simple-table dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                v-for="item in header"
                :key="item"
                class="text-left title font-weight-bold"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in staffs" :key="item.key" class="c-column">
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.table }}</td>
              <td>{{ item.date }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <template>
      <div class="d-flex justify-end mr-5 mt-5">
        <v-pagination
          color="#F0623D"
          v-model="page"
          :length="totalPage"
          @next="panigate"
          @previous="panigate"
          @input="panigate"
        ></v-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: [
        "Tên món",
        "Giá",
        "Số lượng",
        "Số bàn",
        "Ngày order"
      ],
      staffs: [],
      dialog: false,
      isUpdate: false,
      page: 1,
      totalPage: 0,
      totalItem: 0,
      name: ""
    };
  },
  mounted() {
    this.getStaffList();
    this.name = this.$route.query.name
  },
  methods: {
    async getStaffList() {
      const key = this.$route.params.id
      try {
        let peoples = [];
        this.$fire.database.ref("users/" + key + '/history_order').on("value", snapshot => {
          snapshot.forEach(doc => {
            peoples.push({
              key: doc.key,
              name: doc.val().name,
              price: doc.val().price,
              quantity: doc.val().quantity,
              table: doc.val().table,
              date: doc.val().date,
            });
          });
        this.totalItem = peoples
        this.totalPage = Math.ceil(this.totalItem.length / 6);
        this.panigate();
        });
      } catch (error) {
        this.$notyf.error({
          message: error,
          icon: false,
          dismissible: true
        });
      }
    },
    panigate() {
      const data = [];
      let countItem = this.page * 10;
      if (countItem > this.totalItem.length) countItem = this.totalItem.length;
      for (let i = (this.page - 1) * 10; i < countItem; i++) {
        data.push(this.totalItem[i]);
      }
      this.staffs = data;
    },
    clickRow(item){
      this.$router.push({name: "statistical-id", params: {id: item.key}})
    }
  }
};
</script>
<style>
.c-column {
  height: 64px;
}
</style>
