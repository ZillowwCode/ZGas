<template>
  <div class="signout-view">
    <h1 class="text-h2 mt-4">Etes-vous sû(e) de vouloir vous déconnecter ?</h1>
    <v-btn color="success" :to="{ name: 'home' }">Annuler</v-btn>
    <v-btn color="error" @click="signOut">Déconnexion</v-btn>
  </div>
</template>

<script>
import { globalSignOut } from "@/firebase/services/auth";

export default {
    name: "SignOutView",
    methods: {
        signOut() {
            globalSignOut();
            this.$router.push({ name: 'home' })
        }
    }
}
</script>

<style>

</style>