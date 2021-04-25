<template>
  <v-app
    app
  >
    <v-app-bar v-if="isLogged" app color="#F0623D">
      <v-container>
        <div class="text-right white--text font-weight-bold">
          Nho Ho
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-if="isLogged" app color="#F8EFE5">
      <div class="mb-9">
        <v-img src="/logo_text.png"></v-img>
      </div>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          class="py-3"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon color="#303030">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="#303030--text font-weight-bold">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider color="#303030"></v-divider>
        <v-btn
          block
          @click.stop="logout"
          color="#F8EFE5"
        >
          {{$t("admin.logout")}}
        </v-btn>
        <v-divider color="#303030"></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <c-main-scroll>
        <nuxt />
      </c-main-scroll>
    </v-main>
    <v-footer
      absolute
      app
    >
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLogged'])
  },
  data () {
    return {
      items: [
          { title: this.$i18n.t("admin.home"), icon: 'mdi-home-city', to: '/' },
          { title: this.$i18n.t("admin.staff"), icon: 'mdi-account', to: '/staff' },
          { title: this.$i18n.t("admin.customer"), icon: 'mdi-account-group-outline', to: '/customer' },
          { title: this.$i18n.t("admin.table"), icon: 'mdi-table-large', to: '/table' },
          { title: this.$i18n.t("admin.menu"), icon: 'mdi-account-group-outline', to: '/menu' },
          { title: this.$i18n.t("admin.table_manager"), icon: 'mdi-account-group-outline', to: '/tables' },
          { title: this.$i18n.t("admin.coupon"), icon: 'mdi-account-group-outline', to: '/coupon' },
          { title: this.$i18n.t("admin.statistics"), icon: 'mdi-account-group-outline', to: '/order' },
        ],
    }
  },
  methods: {
    logout(){
      this.$router.push({name: 'login'})
      this.$store.commit("SET_LOGGED", false)
    }
  }
}
</script>
