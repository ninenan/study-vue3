import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/cat",
    name: "Cat",
    component: () => import("@/views/Cat.vue"),
  },
  {
    path: "/modal",
    name: "Modal",
    component: () => import("@/views/Modal.vue"),
  },
  {
    path: "/suspense",
    name: "Suspense",
    component: () => import("@/views/Suspense.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
