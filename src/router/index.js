import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UseMind from '../views/useMind.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: UseMind,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
