<template>
  <div class="signout-view">
    <h1 class="text-h2 mt-4">Etes-vous sûr(e) de vouloir vous déconnecter ?</h1>
    <v-btn color="success" :to="{ name: 'home' }">Annuler</v-btn>
    <v-btn color="error" @click="signOut">Déconnexion</v-btn>
  </div>
</template>

<script>
import { logout } from '@/Services/auth';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

export default {
    name: "SignOutView",
    methods: {
      async signOut() {
        await logout();
        this.$router.push({ name: 'home' });
      }
    },
    beforeMount() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.$router.push({ name: 'signin' });
        }
      })
    }
}
</script>

<style>

</style>