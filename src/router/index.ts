/*
 * @Author: NineNan
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-05-10 10:08:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\router\index.ts
 */
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
  {
    path: "/studyWatch",
    name: "StudyWatch",
    component: () => import("@/views/StudyWatch.vue"),
  },
  // {
  //   path: "/studyAnt",
  //   name: "StudyAnt",
  //   component: () => import("@/views/StudyAnt.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
