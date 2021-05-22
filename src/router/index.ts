/*
 * @Author: NineNan
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-05-22 12:49:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import study from "./modules/study";
import music from "./modules/music";

// 公共路由
const baseRouter: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/music",
  },
];

const routes: Array<RouteRecordRaw> = [study, music, ...baseRouter];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "StudyVuexModules") {
    if (sessionStorage.getItem("token") && to.meta.redirectLogin) {
      next();
    } else {
      next("/studyVuex");
    }
  } else {
    next();
  }
});

export default router;
