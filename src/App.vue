<template>
  <v-app>
    <v-main>
      <v-container>
        <nav>
          <router-link :to="{ name: 'home' }">Accueil</router-link>
          <router-link :to="{ name: 'entries' }" class="ml-3">
            Saisies
          </router-link>
        </nav>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
