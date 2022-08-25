import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/entries",
    name: "entries",
    component: () => import("@/views/EntriesView.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/views/Auth/SignInView.vue")
  },
  {
    path: "/signout",
    name: "signout",
    component: () => import("@/views/Auth/SignOutView.vue"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
