<template>
  <c-layout center>
    <div class="py-3">
      <v-card class="ma-auto" flat color="transparent" max-width="343">
        <v-card-title>
          LOGIN
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            type="email"
            label="Email"
          />
          <v-text-field
            v-model="password"
            label="Password"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            large
            block
            @click.stop="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </c-layout>
</template>

<script>

export default {
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login(){
      await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.$store.commit("SET_LOGGED", true);
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

</script>
