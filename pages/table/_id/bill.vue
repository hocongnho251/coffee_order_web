<template>
  <div class="">
    <v-card class="mt-9">
      <div class="display-1 font-weight-bold mb-5">
        {{ $t("table.bill.title") }} {{ name }}
      </div>
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
            <tr v-for="(item, index) in bills" :key="item.key" class="c-column">
              <td>{{ index + 1 }}</td>
              <td>{{ item.order_name }}</td>
              <td>{{ item.order_quantity }}</td>
              <td>{{ item.order_price }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <div class="total-amount">
      {{ $t("table.bill.total_amount") }}: {{ totalAmount }} VNĐ
    </div>
    <v-btn color="#F0623D" class="white--text mx-3" @click="payment">{{
      $t("table.bill.payment")
    }}</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: [
        this.$t("table.bill.header.no"),
        this.$t("table.bill.header.name"),
        this.$t("table.bill.header.quantity"),
        this.$t("table.bill.header.price")
      ],
      bills: [],
      totalAmount: 0,
      name: "",
      key: ""
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      this.name = this.$route.params.id;
      this.key = this.$route.query.key;
      try {
        this.$fire.database.ref("table/" + this.key + "/order").on("value", snap => {
          snap.forEach(order => {
            this.totalAmount += order.val().price;
            this.bills.push({
              order_name: order.val().name,
              order_quantity: order.val().quantity,
              order_price: order.val().price
            });
          });
        });
      } catch (error) {
        this.$notyf.error({
          message: error,
          icon: false,
          dismissible: true
        });
      }
    },
    payment() {
      try {
        this.$fire.database.ref("table/" + this.key + "/order").remove();
        this.$fire.database.ref("table/" + this.key).update({
          status: "waiting"
        });
        this.$notyf.success({
          message: this.$t('notyf.payment.success'),
          icon: false,
          dismissible: true
        });
        this.$router.push({ name: "table" });
      } catch (error) {
        console.error(error)
        this.$notyf.error({
          message: this.$t('notyf.payment.error'),
          icon: false,
          dismissible: true
        });
      }
    }
  }
};
</script>

<style>
.c-column {
  height: 64px;
}

.total-amount {
  text-align: right;
  font-weight: bold;
  font-size: 25px;
  margin: 20px;
  color: #f0623d;
}
</style>
