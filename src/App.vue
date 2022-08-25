<template>
  <v-app>
    <v-main>
      <v-container>
        <nav>
          <router-link :to="{ name: 'home' }">Accueil</router-link>
          <router-link :to="{ name: 'signin' }" class="ml-3" v-if="!isLoggedIn">Connexion</router-link>
          <router-link :to="{ name: 'signout' }" class="ml-3" v-if="isLoggedIn">Déconnexion</router-link>
        </nav>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: "App",
  data() {
    return {
      isLoggedIn: false,
    }
  },
  async beforeMount() {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = user ? true : false;
    })
  }
};
</script>
