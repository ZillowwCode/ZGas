<template>
  <div class="home-view">
    <h1 class="text-h2 mt-4" v-if="!currentUser">Accueil</h1>
    <h1 class="text-h2 mt-4" v-else>Bonjour, {{ currentUser.displayName }}.</h1>
    <v-btn v-if="currentUser" append-icon="mdi-arrow-right" class="mt-4" color="primary" :to="{ name: 'entries' }">Voir mes saisies</v-btn>
    <p v-if="!currentUser">Veuillez <router-link :to="{ name: 'signin' }">vous connecter</router-link>.</p>
    <br />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from '@firebase/auth';

export default {
  name: "HomeView",
  data() {
    return {
      currentUser: null,
    }
  },
  async beforeMount() {
    const auth = await getAuth();
    await onAuthStateChanged(auth, (user) => {
      this.currentUser = user ? user : null;
    })
  }
};
</script>
