/*
 * @Author: NineNan
 * @Date: 2021-05-17 22:31:15
 * @LastEditTime: 2021-07-01 09:45:56
 * @LastEditors: Please set LastEditors
 * @Description: study demo router
 * @FilePath: /study_vue03/src/router/modules/study.ts
 */
import { RouteRecordRaw } from "vue-router";

const study: RouteRecordRaw = {
  path: "/study",
  name: "study",
  redirect: "/study/abort",
  component: () => import("@/views/Home.vue"),
  children: [
    {
      path: "about",
      name: "about",
      component: () => import("@/views/study/about.vue"),
    },
    {
      path: "cat",
      name: "cat",
      component: () => import("@/views/study/cat.vue"),
    },
    {
      path: "study-modal",
      name: "studyModal",
      component: () => import("@/views/study/study-modal.vue"),
    },
    {
      path: "study-suspense",
      name: "studySuspense",
      component: () => import("@/views/study/study-suspense.vue"),
    },
    {
      path: "studyWatch",
      name: "StudyWatch",
      component: () => import("@/views/StudyWatch.vue"),
    },
    {
      path: "study-dropdown",
      name: "studyDropdown",
      component: () => import("@/views/study/study-dropdown.vue"),
    },
    {
      path: "study-validate",
      name: "studyValidate",
      component: () => import("@/views/study/study-validate.vue"),
    },
    {
      path: "study-vuex",
      name: "studyVuex",
      component: () => import("@/views/study/study-vuex.vue"),
    },
    {
      path: "study-vuex-modules/:id/:userName",
      name: "studyVuexModules",
      component: () => import("@/views/study/study-vuex-modules.vue"),
      meta: {
        redirectLogin: true,
      },
    },
    {
      path: "study-provide",
      name: "studyProvide",
      component: () => import("@views/study/study-provide.vue"),
      meta: {
        title: "学习Provide / Inject",
      },
    },
    {
      path: "study-jsx",
      name: "studyJSX",
      component: () => import("@views/study/study-jsx.vue"),
      meta: {
        title: "学习JSX",
      },
    },
    {
      path: "study-directive",
      name: "studyDirective",
      component: () => import("@views/study/study-directive.vue"),
      meta: {
        title: "学习directive",
      },
    },
    {
      path: "study-slot",
      name: "studySlot",
      component: () => import("@views/study/study-slot.vue"),
      meta: {
        title: "学习slot",
      },
    },
    {
      path: "study-css",
      name: "studyCss",
      component: () => import("@views/study/study-css.vue"),
      meta: {
        title: "学习slot",
      },
    },
  ],
};

export default study;
