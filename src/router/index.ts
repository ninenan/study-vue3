/*
 * @Author: NineNan
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-06-28 10:13:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const modulesFiles = require.context("./modules", true, /\.ts$/);
const modules: Array<RouteRecordRaw> = modulesFiles
  .keys()
  .reduce((modules: Array<RouteRecordRaw>, modulePath) => {
    const value = modulesFiles(modulePath);
    modules.push(value.default);
    return modules;
  }, []);

// 公共路由
const baseRouter: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/music",
  },
];

const routes: Array<RouteRecordRaw> = [...modules, ...baseRouter];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.name === "studyVuexModules") {
    if (sessionStorage.getItem("token") && to.meta.redirectLogin) {
      next();
    } else {
      next("/study/study-vuex");
    }
  } else {
    next();
  }
  if (typeof to.meta.title !== undefined) {
    document.title = (to.meta.title as string) || "studyVue3";
  }
});

export default router;
