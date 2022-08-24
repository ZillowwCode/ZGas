<template>
  <div class="home-view">
    <h1 class="text-h2 mt-4" v-if="!isLoggedIn">Accueil</h1>
    <h1 class="text-h2 mt-4" v-else>Bonjour, {{ currentUser.displayName }}</h1>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: [
    "currentUser", "isLoggedIn"
  ],
};
</script>
