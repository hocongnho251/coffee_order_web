<template>
  <div>
    <v-card class="mt-9">
      <div class="display-1 mb-6 font-weight-bold">Thông kê lịch sử order</div>
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
              <td>{{ item.email }}</td>
              <td>{{ item.firstName }} {{ item.lastName }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.role }}</td>
              <td>
                <v-btn icon @click="clickRow(item)">
                  <v-icon>
                    mdi-details
                  </v-icon>
                </v-btn>
              </td>
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
        this.$i18n.t("staff.header.email"),
        this.$i18n.t("staff.header.name"),
        this.$i18n.t("staff.header.phone"),
        this.$i18n.t("staff.header.role"),
        ""
      ],
      staffs: [],
      dialog: false,
      editItem: {
        key: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: "",
        password: ""
      },
      editIndex: -1,
      isUpdate: false,
      page: 1,
      totalPage: 0,
      totalItem: 0
    };
  },
  mounted() {
    this.getStaffList();
  },
  methods: {
    async getStaffList() {
      try {
        let peoples = [];
        this.$fire.database.ref("users").on("value", snapshot => {
          snapshot.forEach(doc => {
            peoples.push({
              key: doc.key,
              email: doc.val().email,
              firstName: doc.val().firstName,
              lastName: doc.val().lastName,
              phone: doc.val().phone,
              role: doc.val().role,
              is_delete: doc.val().is_delete
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
      let countItem = this.page * 6;
      if (countItem > this.totalItem.length) countItem = this.totalItem.length;
      for (let i = (this.page - 1) * 6; i < countItem; i++) {
        data.push(this.totalItem[i]);
      }
      this.staffs = data;
    },
    clickRow(item){
      this.$router.push({name: "statistical-id", params: {id: item.key}, query: {name: item.firstName + item.lastName}})
    }
  }
};
</script>
<style>
.c-column {
  height: 64px;
}
</style>
