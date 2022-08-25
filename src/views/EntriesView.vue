<template>
  <div class="entries-view">
    <h1 class="text-h2 mt-3">Saisies</h1>
    <v-form @submit.prevent="newEntry">
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
    <h1 class="text-h3 mt-10">Mes saisies :</h1>
    <div class="entries-display">
      <v-table class="mt-2">
        <thead>
          <tr>
            <th>Date</th>
            <th>Prix</th>
            <th>Rempli</th>
            <th>Payé</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody v-if="entries.length">
          <tr v-for="entrie in entries" :key="entrie.id">
            <td>{{entrie.date}}</td>
            <td>{{entrie.price}}</td>
            <td>{{entrie.filled}}</td>
            <td>{{entrie.paid}}</td>
            <td>
              <v-btn icon color="red" size="small" @click="deleteEntrie(entrie.id)"><v-icon color="white">mdi-delete</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <p class="text-h6 py-5 px-5">Aucune saisie trouvée.</p>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import { newEntry, getEntries, deleteEntrie } from "@/Services/entries";
import { getAuth, onAuthStateChanged } from '@firebase/auth';

export default {
  name: "EntriesView",
  data() {
    return {
      newPrice: '',
      newFilled: '',
      newPaid: '',
      entries: [],
      isLoading: false,
    }
  },
  methods: {
    async newEntry() {
      const createdEntry = await newEntry(this.newPrice, this.newFilled, this.newPaid);
      this.entries.unshift(createdEntry);
      this.newPrice = "";
      this.newFilled = "";
      this.newPaid = "";
    },

    async deleteEntrie(_id) {
      const filteredEntries = await deleteEntrie(_id, this.entries);
      this.entries = filteredEntries;
    }
  },
  async beforeMount() {
    const auth = getAuth();
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Récupérer entries
        this.entries = await getEntries();
      } else {
        this.$router.push({ name: 'signin' })
      }
    })
  }
};
</script>

<style></style>
