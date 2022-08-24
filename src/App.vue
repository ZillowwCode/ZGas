<template>
  <v-app>
    <v-main>
      <v-container>
        <nav>
          <router-link :to="{ name: 'home' }">Accueil</router-link>
          <router-link :to="{ name: 'entries' }" class="ml-3">Saisies</router-link>
          <router-link :to="{ name: 'signin' }" class="ml-3" v-if="!isLoggedIn">Connexion</router-link>
          <router-link :to="{ name: 'signout' }" class="ml-3" v-if="isLoggedIn">Déconnexion</router-link>
        </nav>
        <router-view :currentUser="currentUser" :isLoggedIn="isLoggedIn" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '@/store/auth';

export default {
  name: "App",
  data() {
    return {
      currentUser: null,
      isLoggedIn: null,
    }
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const authStore = useAuthStore();
        this.currentUser = user;
        this.isLoggedIn = true;
        authStore.setUser(user);
      } else {
        const authStore = useAuthStore();
        this.currentUser = false;
        this.isLoggedIn = false;
        authStore.clearUser();
      }
    })
  }
};
</script>
