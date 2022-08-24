<template>
  <div class="signin">
    <h1 class="text-h2 mt-4">Connexion</h1>
    <v-btn color="success" class="mt-10" size="large" @click="signInWithGoogle"><v-icon class="mr-3">mdi-google</v-icon>Connexion avec Google</v-btn>
  </div>
</template>

<script>
import { googleSignIn } from "@/firebase/services/auth";

export default {
    name: 'SignInView',
    methods: {
      async signInWithGoogle() {
        await googleSignIn();
        this.$router.push({ name: 'home' })
      }
    }
}
</script>

<style>

</style>