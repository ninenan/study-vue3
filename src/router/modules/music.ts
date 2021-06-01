/*
 * @Author: NineNan
 * @Date: 2021-05-17 22:55:24
 * @LastEditTime: 2021-06-01 21:39:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/router/modules/music.ts
 */
import { RouteRecordRaw } from "vue-router";
const music: RouteRecordRaw = {
  path: "/music",
  name: "music",
  redirect: "/music/recommend",
  component: () => import("@/components/Layout.vue"),
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
      children: [
        {
          path: ":mid",
          name: "SingerDetails",
          component: () => import("@/views/singerDetails/index.vue"),
          meta: {
            title: "歌手详情",
          },
        },
      ],
    },
  ],
};

export default music;
