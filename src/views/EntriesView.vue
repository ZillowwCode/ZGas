<template>
  <div class="entries-view">
    <h1 class="text-h2 mt-3">Saisies</h1>
    <v-form @submit.prevent="createEntry">
      <h1 class="text-h4 mt-4">Nouvelle saisie</h1>
      <v-row class="mt-1">
        <v-col md="4">
          <v-text-field
            type="number"
            label="Prix au litre"
            v-model="newPrice"
          />
        </v-col>
        <v-col md="4">
          <v-text-field label="Rempli" type="number" v-model="newFilled" />
        </v-col>
        <v-col md="4">
          <v-text-field label="Payé" type="number" v-model="newPaid" />
        </v-col>
      </v-row>
      <v-btn color="primary" type="submit" block>Nouvelle saisie</v-btn>
    </v-form>
    <v-table v-if="entries.length" class="mt-4">
      <thead>
        <tr>
          <th>Date</th>
          <th>CHF/L</th>
          <th>L</th>
          <th>CHF</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entrie in entries" :key="entrie.id">
          <td>{{ entrie.date }}</td>
          <td>{{ entrie.price }}</td>
          <td>{{ entrie.filled }}</td>
          <td>{{ entrie.paid }}</td>
          <td>
            <v-btn icon @click="deleteEntry(entrie.id, currentUser.uid)"
              ><v-icon color="error">mdi-delete</v-icon></v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
    <h1 v-else class="text-h5 text-center mt-4">
      Aucune saisie pour l'instant.
    </h1>
  </div>
</template>

<script>
import { createEntry, deleteEntry } from "@/firebase/services/entries";
import { useAuthStore } from "@/store/auth"
// import { storeToRefs } from "pinia";

export default {
  name: "EntriesView",
  data() {
    return {
      newPrice: "",
      newFilled: "",
      newPaid: "",
      entries: [],
    };
  },
  methods: {
    async createEntry() {
      if (this.newPrice === 0) return;
      if (this.newFilled === 0) return;
      if (this.newPaid === 0) return;

      await createEntry(this.newPrice, this.newFilled, this.newPaid);

      this.entries.push({
        date: Date.now(),
        price: this.newPrice,
        filled: this.newFilled,
        paid: this.newPaid,
      });
    },

    async deleteEntry(_id, _uid) {
      await deleteEntry(_id, _uid);
    },
  },
  beforeMount() {
    const authStore = useAuthStore();
    this.currentUser = authStore.getCurrentUser;
  },
  mounted() {
    console.log(this.currentUser);
  },
  computed: {
    currentUser() {
      const authStore = useAuthStore();
      return authStore.currentUser;
    }
  }
};
</script>

<style></style>
