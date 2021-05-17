/*
 * @Author: NineNan
 * @Date: 2021-05-17 22:31:15
 * @LastEditTime: 2021-05-17 22:54:17
 * @LastEditors: Please set LastEditors
 * @Description: study demo router
 * @FilePath: /study_vue03/src/router/modules/study.ts
 */
// import { _RouteRecordBase } from "vue-router";

const study = {
  path: "/study",
  name: "study",
  redirect: "/abort",
  component: () => import("@/views/Home.vue"),
  children: [
    {
      path: "about",
      name: "About",
      component: () => import("@/views/About.vue"),
    },
    {
      path: "cat",
      name: "Cat",
      component: () => import("@/views/Cat.vue"),
    },
    {
      path: "modal",
      name: "Modal",
      component: () => import("@/views/Modal.vue"),
    },
    {
      path: "suspense",
      name: "Suspense",
      component: () => import("@/views/Suspense.vue"),
    },
    {
      path: "studyWatch",
      name: "StudyWatch",
      component: () => import("@/views/StudyWatch.vue"),
    },
    {
      path: "dropdown",
      name: "Dropdown",
      component: () => import("@/views/Dropdown.vue"),
    },
    {
      path: "studyValidate",
      name: "StudyValidate",
      component: () => import("@/views/StudyValidate.vue"),
    },
    {
      path: "studyVuex",
      name: "StudyVuex",
      component: () => import("@/views/StudyVuex.vue"),
    },
    {
      path: "studyVuexModules/:id",
      name: "StudyVuexModules",
      component: () => import("@/views/StudyVuexModules.vue"),
      meta: {
        redirectLogin: true,
      },
    },
  ],
};

export default study;