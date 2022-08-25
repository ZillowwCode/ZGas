import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3Z_XvQmodJjwqraukUKwGO53VxACd8S8",
  authDomain: "zgas-23504.firebaseapp.com",
  projectId: "zgas-23504",
  storageBucket: "zgas-23504.appspot.com",
  messagingSenderId: "402799427162",
  appId: "1:402799427162:web:6d4a531c90c946ef426263"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

export {auth, db}
