<template>
  <v-app
    app
  >
    <v-app-bar app>
      <v-container>
        {{$t("admin.home")}}
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-if="isLogged" app color="#333">
      <v-list-item class="px-2 py-6">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="white--text">John Leider</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon color="white">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider color="white"></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          class="py-3"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-btn
          block
          @click="logout"
        >

          {{$t("admin.logout")}}
        </v-btn>
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
          { title: this.$i18n.t("admin.user"), icon: 'mdi-account-group-outline', to: '/user' },
          { title: this.$i18n.t("admin.order"), icon: 'mdi-account-group-outline', to: '/order' },
          { title: this.$i18n.t("admin.table"), icon: 'mdi-account-group-outline', to: '/order' },
          { title: this.$i18n.t("admin.coupon"), icon: 'mdi-account-group-outline', to: '/order' },
          { title: this.$i18n.t("admin.statistics"), icon: 'mdi-account-group-outline', to: '/order' },
        ],
    }
  },
  methods: {
    logout(){
      this.$store.commit("SET_LOGGED", false)
      this.$router.push({path: '/login'})
    }
  }
}
</script>
