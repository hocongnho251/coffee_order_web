<template>
  <div>
    <v-card class="mt-9">
      <div class="display-1 font-weight-bold">{{ $t("customer.title") }}</div>
      <v-btn
        color="#F0623D"
        class="outline-btn white--text font-weight-bold my-9 ml-5"
        @click="open"
      >
        {{ $t("customer.new") }}
      </v-btn>
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
                {{
                  isDelete(item.is_delete)
                    ? $t("customer.inactive")
                    : $t("customer.active")
                }}
              </td>
              <td>{{ item.point }}</td>
              <td>
                <v-btn icon @click="editStaff(item)">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  @click="
                    isDelete(item.is_delete) ? onRestore(item) : onDelete(item)
                  "
                >
                  <v-icon>
                    {{
                      isDelete(item.is_delete) ? "mdi-restore" : "mdi-delete"
                    }}
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
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ $t("customer.form.title") }}
          <v-btn absolute right icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <c-form ref="cform" @submit="onEdit">
              <v-row>
                <v-col cols="12">
                  <div>{{ $t("customer.form.email") }}</div>
                  <c-text-field
                    v-model="editItem.email"
                    :disabled="isUpdate"
                    label="Email"
                    rules="required"
                  ></c-text-field>
                </v-col>
                <v-col v-if="!isUpdate" cols="12">
                  <div>{{ $t("customer.form.password") }}</div>
                  <c-text-field
                    v-model="editItem.password"
                    password
                    :label="$t('customer.form.password')"
                    rules="required|password"
                  ></c-text-field>
                </v-col>
                <v-col cols="12">
                  <div>{{ $t("customer.form.first_name") }}</div>
                  <c-text-field
                    v-model="editItem.firstName"
                    :label="$t('customer.form.first_name')"
                    rules="required"
                  ></c-text-field>
                </v-col>
                <v-col cols="12">
                  <div>{{ $t("customer.form.last_name") }}</div>
                  <c-text-field
                    v-model="editItem.lastName"
                    :label="$t('customer.form.last_name')"
                    rules="required"
                  ></c-text-field>
                </v-col>
                <v-col cols="12">
                  <div>{{ $t("customer.form.phone") }}</div>
                  <c-text-field
                    v-model="editItem.phone"
                    :label="$t('customer.form.phone')"
                    rules="required|numeric"
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
                  {{ isUpdate ? $t("customer.form.edit") : $t("customer.form.add") }}
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
        this.$i18n.t("customer.header.email"),
        this.$i18n.t("customer.header.name"),
        this.$i18n.t("customer.header.phone"),
        this.$i18n.t("customer.header.role"),
        this.$i18n.t("customer.header.status"),
        this.$i18n.t("customer.header.point"),
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
        password: "",
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
        var peoples = [];
        this.$fire.database.ref("users").on("value", snapshot => {
          snapshot.forEach(doc => {
            peoples.push({
              key: doc.key,
              email: doc.val().email,
              firstName: doc.val().firstName,
              lastName: doc.val().lastName,
              phone: doc.val().phone,
              role: doc.val().role,
              point: doc.val().point,
              is_delete: doc.val().is_delete
            });
          });
        });
        this.totalItem = peoples.filter(item => item.role == "customer");
        this.totalPage = Math.ceil(this.totalItem.length / 6);
        this.panigate();
      } catch (error) {
        this.$notyf.error({
          message: error,
          icon: false,
          dismissible: true
        });
      }
    },
    editStaff(item) {
      this.editIndex = this.staffs.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
      this.isUpdate = true;
    },
    onEdit() {
      try {
        if (this.isUpdate) {
          this.$fire.database.ref("users/" + this.editItem.key).update({
            email: this.editItem.email,
            firstName: this.editItem.firstName,
            lastName: this.editItem.lastName,
            phone: this.editItem.phone,
            role: this.editItem.role
          });
          this.getStaffList();
          this.dialog = false;
          this.$notyf.success({
            message: "Cập nhật thành công",
            icon: false,
            dismissible: true
          });
        } else {
          this.$fire.auth.createUserWithEmailAndPassword(
            this.editItem.email,
            this.editItem.password
          );
          this.$fire.database.ref("users/").push({
            email: this.editItem.email,
            firstName: this.editItem.firstName,
            lastName: this.editItem.lastName,
            phone: this.editItem.phone,
            role: "customer",
            point: 0
          });
          this.getStaffList();
          this.dialog = false;
          this.$notyf.success({
            message: "Thêm thành công",
            icon: false,
            dismissible: true
          });
        }
      } catch (error) {
        this.$notyf.error({
          message: error,
          icon: false,
          dismissible: true
        });
      }
    },
    close() {
      this.dialog = false;
    },
    open() {
      this.editItem = {
        key: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: "",
        password: ""
      };
      this.isUpdate = false;
      this.dialog = true;
    },
    onDelete(item) {
      try {
        this.$fire.database.ref("users/" + item.key).update({
          is_delete: 1
        });
        this.getStaffList();
        this.$notyf.success({
          message: "Xóa thành công",
          icon: false,
          dismissible: true
        });
      } catch (error) {
        this.$notyf.error({
          message: error,
          icon: false,
          dismissible: true
        });
      }
    },
    isDelete(item) {
      if (item == 1) return true;
      return false;
    },
    onRestore(item) {
      try {
        this.$fire.database.ref("users/" + item.key).update({
          is_delete: 0
        });
        this.getStaffList();
        this.$notyf.success({
          message: "Khôi phục thành công",
          icon: false,
          dismissible: true
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
    }
  }
};
</script>
<style>
.c-column {
  height: 64px;
}
</style>
