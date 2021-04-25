<template>
  <c-layout center>
    <v-img src="logo.png" height="200" contain> </v-img>
    <div>
      <v-card
        class="ma-auto text-center"
        flat
        color="transparent"
        max-width="400"
      >
        <v-card-title class="d-flex justify-center display-1 font-weight-bold">
          Admin Login
        </v-card-title>
        <c-form ref="cform" @submit="login">
          <v-card-text>
            <c-text-field
              v-model="email"
              rules="required|email"
              label="Email"
            />
            <c-text-field
              v-model="password"
              rules="required|password"
              password
              label="Password"
            />
          </v-card-text>
          <template v-slot:action>
            <v-btn
              large
              width="200"
              color="#F0623D"
              class="outline-btn font-weight-bold"
              @click="$refs.cform.submit()"
            >
              Login
            </v-btn>
          </template>
        </c-form>
      </v-card>
    </div>
  </c-layout>
</template>

<script>
import cForm from "../components/global/c-form.vue";

export default {
  components: { cForm },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      await this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          this.$store.commit("SET_LOGGED", true);
          this.$notyf.success({
            message: this.$t('notyf.login.success'),
            icon: false,
            dismissible: true
          });
          this.$router.push("/staff");
        })
        .catch(error => {
          this.$notyf.error({
            message: this.$t('notyf.login.error'),
            icon: false,
            dismissible: true
          });
        });
    }
  }
};
</script>
