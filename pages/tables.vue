<template>
  <div>
    <v-card class="mt-9">
      <div class="display-1 font-weight-bold">{{ $t("table_manager.title") }}</div>
      <v-btn
        color="#F0623D"
        class="outline-btn white--text font-weight-bold my-9 ml-5"
        @click="open"
      >
        {{ $t("staff.new") }}
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
            <tr v-for="item in tableList" :key="item.key" class="c-column">
              <td>{{ item.name }}</td>
              <td>{{ item.status == "waiting" ? "Trống" : "Có khách" }}</td>
              <td>
                <v-btn icon @click="editStaff(item)">
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
          {{ $t("table_manager.form.title") }}
          <v-btn absolute right icon @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <c-form ref="cform" @submit="onEdit">
              <v-row>
                <v-col cols="12">
                  <div>{{ $t("table_manager.header.name") }}</div>
                  <c-text-field
                    v-model="editItem.name"
                    :label="$t('table_manager.header.name')"
                    rules="required"
                  ></c-text-field>
                </v-col>
                <v-col cols="12">
                  <div>{{ $t("table_manager.header.status") }}</div>
                  <v-select
                    v-model="editItem.status"
                    :items="items"
                  ></v-select>
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
        this.$i18n.t("table_manager.header.name"),
        this.$i18n.t("table_manager.header.status"),
      ],
      items: [
        "Trống",
        "Có khách"
      ],
      tableList: [],
      dialog: false,
      editItem: {
        key: "",
        name: "",
        status: ""
      },
      editIndex: -1,
      isUpdate: false,
      page: 1,
      totalPage: 0,
      totalItem: 0
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      try {
        var list = [];
        this.$fire.database.ref("table/").on("value", snapshot => {
          snapshot.forEach(doc => {
            list.push({
              key: doc.key,
              name: doc.val().name,
              status: doc.val().status
            });
          });
        this.totalItem = list;
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
    editStaff(item) {
      this.editIndex = this.tableList.indexOf(item);
      this.editItem = Object.assign({}, item);
      this.dialog = true;
      this.isUpdate = true;
    },
    onEdit() {
      try {
        if (this.isUpdate) {
          this.$fire.database.ref("table/" + this.editItem.key).update({
            name: this.editItem.name,
            status: this.editItem.status == "Trống" ? "waiting" : "actives"
          });
          this.getTableList();
          this.dialog = false;
          this.$notyf.success({
            message: "Cập nhật thành công",
            icon: false,
            dismissible: true
          });
        } else {
          this.$fire.database.ref("table/").push({
            name: this.editItem.name,
            status: this.editItem.status == "Trống" ? "waiting" : "actives"
          });
          this.getTableList();
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
        name: "",
        status: ""
      };
      this.isUpdate = false;
      this.dialog = true;
    },
    onDelete(item) {
      try {
        this.$fire.database.ref("table/" + item.key).remove();
        this.getTableList();
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
    panigate() {
      const data = [];
      let countItem = this.page * 6;
      if (countItem > this.totalItem.length) countItem = this.totalItem.length;
      for (let i = (this.page - 1) * 6; i < countItem; i++) {
        data.push(this.totalItem[i]);
      }
      this.tableList = data;
    }
  }
};
</script>
<style>
.c-column {
  height: 64px;
}
</style>
