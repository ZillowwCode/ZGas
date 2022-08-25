<template>
  <div class="signin">
    <h1 class="text-h2 mt-4">Connexion</h1>
    <v-btn color="success" class="mt-10" size="large" :loading="isLoading" @click="signInWithGoogle"><v-icon class="mr-3">mdi-google</v-icon>Connexion avec Google</v-btn>
  </div>
</template>

<script>
import { signInWithGoogle } from "@/Services/auth";
import { getAuth, onAuthStateChanged } from '@firebase/auth';

export default {
    name: 'SignInView',
    data() {
      return {
        isLoading: false,
      }
    },
    methods: {
      async signInWithGoogle() {
        this.isLoading = true;
        await signInWithGoogle();
        this.isLoading = false;
        this.$router.push({ name: 'home' })
      }
    },
    beforeMount() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.$router.push({ name: 'signout' })
        }
      })
    }
}
</script>

<style>

</style>