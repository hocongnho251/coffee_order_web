<template>
  <div class="">
    <v-card class="mt-9">
      <div class="display-1 font-weight-bold mb-5">
        {{ $t("table.bill.title") }} {{ name }}
      </div>
      <div class="title font-weight-bold mb-5">Người đặt : {{ userName }}</div>
      <v-btn color="#F0623D" class="white--text mx-3" @click="onCreate">
        Thêm món</v-btn
      >
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
              <td>
                <v-btn icon @click="editOrder(item)">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn icon @click="onDelete(item)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <div class="total-amount">
      {{ $t("table.bill.total_amount") }}: {{ totalAmount }} VNĐ
    </div>
    <div class="total-amount" v-if="coupon > 0">
      Mã giảm giá : {{ coupon }} VNĐ
    </div>
    <v-divider/>
    <div class="total-amount" v-if="coupon > 0">
      Thanh Toán : {{ totalAmount - coupon }} VNĐ
    </div>
    <div class="total-amount" v-if="point > 0">
      Số điểm được cộng : {{ point }}
    </div>
    <v-btn color="#F0623D" class="white--text mx-3" @click="payment">{{
      $t("table.bill.payment")
    }}</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Thông tin món
          <v-btn absolute right icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <c-form ref="cform" @submit="onEdit">
              <v-row>
                <v-col cols="12">
                  <div>Tên Món</div>
                  <c-text-field
                    v-if="isUpdate"
                    v-model="editItem.order_name"
                    :disabled="isUpdate"
                    label="Tên món"
                    rules="required"
                  ></c-text-field>
                  <v-select
                    v-else
                    v-model="item"
                    :items="menu"
                    item-text="name"
                    item-value="name"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <div>Số lượng</div>
                  <c-text-field
                    v-model="editItem.order_quantity"
                    label="Số lượng"
                    rules="required|min"
                  ></c-text-field>
                </v-col>
              </v-row>
              <template v-slot:action>
                <v-btn
                  large
                  color="#F0623D"
                  class="outline-btn font-weight-bold"
                  @click="$refs.cform.submit()"
                >
                  {{ isUpdate ? $t("staff.form.edit") : $t("staff.form.add") }}
                </v-btn>
              </template>
            </c-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
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
      key: "",
      userName: "",
      dialog: false,
      editItem: {
        key: "",
        order_name: "",
        order_quantity: "",
        order_price: ""
      },
      isUpdate: false,
      menu: [],
      item: "",
      point: 0,
      userEmail: "",
      coupon: ""
    };
  },
  created() {
    this.getOrderList();
    this.getMenuList();
  },
  methods: {
    async getOrderList() {
      this.bills = [];
      this.totalAmount = 0;
      this.name = this.$route.params.id;
      this.key = this.$route.query.key;
      this.userName = this.$route.query.user_name;
      this.userEmail = this.$route.query.email;
      try {
        this.$fire.database
          .ref("table/" + this.key + "/order")
          .on("value", snap => {
            snap.forEach(order => {
              this.totalAmount += order.val().price;
              if (this.totalAmount >= 100000 && this.totalAmount <= 200000) {
                this.point = 1000;
              } else if (
                this.totalAmount <= 500000 &&
                this.totalAmount > 200000
              ) {
                this.point = 2000;
              } else if (this.totalAmount > 500000) {
                this.point = 3000;
              }
              this.bills.push({
                key: order.key,
                order_name: order.val().name,
                order_quantity: order.val().quantity,
                order_price: order.val().price
              });
            });
          });
          this.$fire.database
          .ref("table/" + this.key).on("value", snap => {
            if(snap.val().id_coupon && snap.val().id_coupon !== ""){
              this.$fire.database.ref("coupons/").on("value", snapshot => {
                snapshot.forEach(doc => {
                  if(doc.key == snap.val().id_coupon){
                    this.coupon = doc.val().price;
                  }
                });
              });
            }
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
        this.$fire.database.ref("table/" + this.key ).update({
          id_coupon: "",
        });
        this.$fire.database.ref("table/" + this.key).update({
          status: "waiting"
        });
        let peoples = [];
        this.$fire.database.ref("users").on("value", snapshot => {
          snapshot.forEach(doc => {
            peoples.push({
              key: doc.key,
              email: doc.val().email,
              point: doc.val().point
            });
          });
        });
        const user = peoples.find(item => item.email == this.userEmail);
        this.$fire.database.ref("users/" + user.key).update({
          point: this.point + user.point
        });
        this.$notyf.success({
          message: this.$t("notyf.payment.success"),
          icon: false,
          dismissible: true
        });
        this.$router.push({ name: "table" });
      } catch (error) {
        console.error(error);
        this.$notyf.error({
          message: this.$t("notyf.payment.error"),
          icon: false,
          dismissible: true
        });
      }
    },

    editOrder(item) {
      this.editItem.key = item.key;
      this.editItem.order_name = item.order_name;
      this.editItem.order_quantity = item.order_quantity;
      this.editItem.order_price = item.order_price;
      this.dialog = true;
      this.isUpdate = true;
    },

    close() {
      this.dialog = false;
    },

    onEdit() {
      if (this.isUpdate) {
        try {
          let originPrice = 1;
          this.menu.map(item=>{
            if(this.editItem.order_name == item.name){
              this.originPrice = item.price
            }
          })
          this.$fire.database
            .ref("table/" + this.key + "/order/" + this.editItem.key)
            .update({
              quantity: this.editItem.order_quantity,
              price: this.editItem.order_quantity * this.originPrice
            });
          this.getOrderList();
          this.dialog = false;
          this.$notyf.success({
            message: "Cập nhật order thành công",
            icon: false,
            dismissible: true
          });
        } catch (error) {
          this.$notyf.error({
            message: "Cập nhật order thất bại",
            icon: false,
            dismissible: true
          });
        }
      } else {
        try {
          const priceItem = this.menu.find(item => item.name == this.item);
          this.$fire.database.ref("table/" + this.key + "/order").push({
            name: this.item,
            quantity: this.editItem.order_quantity,
            price: this.editItem.order_quantity * priceItem.price
          });
          this.getOrderList();
          this.dialog = false;
          console.log(this.item);
          this.$notyf.success({
            message: "Thêm món thành công",
            icon: false,
            dismissible: true
          });
        } catch (error) {
          this.$notyf.error({
            message: "Thêm món thất bại",
            icon: false,
            dismissible: true
          });
        }
      }
    },

    onDelete(item) {
      try {
        this.$fire.database
          .ref("table/" + this.key + "/order/" + item.key)
          .remove();
        this.getOrderList();
        this.$notyf.success({
          message: "Xóa món thành công",
          icon: false,
          dismissible: true
        });
      } catch (error) {
        this.$notyf.error({
          message: "Xóa món thất bại",
          icon: false,
          dismissible: true
        });
      }
    },

    onCreate() {
      this.isUpdate = false;
      this.dialog = true;
    },

    async getMenuList() {
      try {
        this.$fire.database.ref("menu/").on("value", snapshot => {
          snapshot.forEach(doc => {
            this.menu.push({
              name: doc.val().name,
              price: doc.val().price
            });
          });
          this.item = this.menu[0].name;
        });
      } catch (error) {
        this.$notyf.error({
          message: error,
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
