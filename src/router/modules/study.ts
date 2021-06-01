/*
 * @Author: NineNan
 * @Date: 2021-05-17 22:31:15
 * @LastEditTime: 2021-06-01 14:46:19
 * @LastEditors: Please set LastEditors
 * @Description: study demo router
 * @FilePath: /study_vue03/src/router/modules/study.ts
 */
import { RouteRecordRaw } from "vue-router";

const study: RouteRecordRaw = {
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
    {
      path: "studyProvide",
      name: "StudyProvide",
      component: () => import("@views/study/StudyProvide.vue"),
      meta: {
        title: "学习Provide / Inject",
      },
    },
    {
      path: "studyJSX",
      name: "StudyJSX",
      component: () => import("@views/study/StudyJSX.vue"),
      meta: {
        title: "学习JSX",
      },
    },
    {
      path: "studyDirective",
      name: "StudyDirective",
      component: () => import("@views/study/StudyDirective.vue"),
      meta: {
        title: "学习directive",
      },
    },
  ],
};

export default study;
