<template>
  <v-app
    app
  >
    <v-app-bar app>
      <v-container>
        {{$t("admin.home")}}
      </v-container>
    </v-app-bar>
    <v-navigation-drawer app color="#333">
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
export default {
  data () {
    return {
      items: [
          { title: this.$i18n.t("admin.home"), icon: 'mdi-home-city', to: '/' },
          { title: 'STAFF', icon: 'mdi-account', to: '/staff' },
          { title: 'USERS', icon: 'mdi-account-group-outline', to: '/user' },
          { title: 'ORDER', icon: 'mdi-account-group-outline', to: '/order' },
        ],
    }
  }
}
</script>
