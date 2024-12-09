import { createMemoryHistory, createRouter } from "vue-router";

import Home from "./views/Home.vue";
import Register from "./views/Register.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
