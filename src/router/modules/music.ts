/*
 * @Author: your name
 * @Date: 2021-05-17 22:55:24
 * @LastEditTime: 2021-05-17 23:10:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/router/modules/music.ts
 */
const music = {
  path: "/music",
  name: "music",
  component: () => import("@/components/base/Layout.vue"),
  children: [
    {
      path: "recommend",
      name: "recommend",
      component: () => import("@/views/recommend/index.vue"),
    },
    {
      path: "search",
      name: "search",
      component: () => import("@/views/search/index.vue"),
    },
    {
      path: "rankingList",
      name: "rankingList",
      component: () => import("@/views/search/index.vue"),
    },
    {
      path: "singer",
      name: "singer",
      component: () => import("@/views/singer/index.vue"),
    },
  ],
};

export default music;
