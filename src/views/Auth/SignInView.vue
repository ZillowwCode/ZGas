<template>
  <div class="signin">
    <h1 class="text-h2 mt-4">Connexion</h1>
    <v-btn color="success" class="mt-10" size="large" @click="signInWithGoogle" :loading="isGoogleSignInLoading"><v-icon class="mr-3">mdi-google</v-icon>Connexion avec Google</v-btn>
  </div>
</template>

<script>
import { googleSignIn } from "@/firebase/services/auth";

export default {
    name: 'SignInView',
    data() {
      return {
        isGoogleSignInLoading: false,
      }
    },
    methods: {
      async signInWithGoogle() {
        this.isGoogleSignInLoading = true;
        await googleSignIn();
        this.isGoogleSignInLoading = false;
        this.$router.push({ name: 'home' })
      }
    }
}
</script>

<style>

</style>