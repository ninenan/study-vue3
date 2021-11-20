/*
 * @Author: NineNan
 * @Date: 2021-05-17 22:55:24
 * @LastEditTime: 2021-08-25 21:53:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/router/modules/music.ts
 */
import { RouteRecordRaw } from "vue-router";

export enum MusicRouteNames {
  music = "music",
  recommend = "recommend",
  albumDetail = "albumDetail",
  search = "search",
  searchSingerDetails = "SearchSingerDetails",
  rankingList = "rankingList",
  rankingDetail = "rankingDetail",
  singer = "singer",
  singerDetails = "SingerDetails",
}

const music: RouteRecordRaw = {
  path: "/music",
  name: MusicRouteNames.music,
  redirect: "/music/recommend",
  component: () =>
    import("@/components/Layout.vue" /*webpackChunkName: "Layout"*/),
  children: [
    {
      path: "recommend",
      name: MusicRouteNames.recommend,
      component: () =>
        import(
          "@/views/music/recommend/index.vue" /*webpackChunkName: "recommend"*/
        ),
      children: [
        {
          path: ":id",
          name: MusicRouteNames.albumDetail,
          component: () =>
            import(
              "@views/music/album-detail/index.vue" /*webpackChunkName: "albumDetail"*/
            ),
          meta: {
            title: "专辑详情",
          },
        },
      ],
    },
    {
      path: "search",
      name: MusicRouteNames.search,
      component: () =>
        import("@/views/music/search/index.vue" /*webpackChunkName: "search"*/),
      children: [
        {
          path: ":mid",
          name: MusicRouteNames.searchSingerDetails,
          component: () =>
            import(
              "@/views/singer-details/index.vue" /*webpackChunkName: "SearchSingerDetails"*/
            ),
          meta: {
            title: "歌手详情",
          },
        },
      ],
    },
    {
      path: "ranking-list",
      name: MusicRouteNames.rankingList,
      component: () =>
        import(
          "@/views/music/ranking-list/index.vue" /*webpackChunkName: "rankingList"*/
        ),
      meta: {
        title: "排行榜",
      },
      children: [
        {
          path: ":id",
          name: MusicRouteNames.rankingDetail,
          component: () =>
            import(
              "@/views/music/ranking-detail/index.vue" /*webpackChunkName: "rankingDetail"*/
            ),
          meta: {
            title: "排行榜详情",
          },
        },
      ],
    },
    {
      path: "singer",
      name: MusicRouteNames.singer,
      component: () =>
        import("@/views/singer/index.vue" /*webpackChunkName: "singer"*/),
      children: [
        {
          path: ":mid",
          name: MusicRouteNames.singerDetails,
          component: () =>
            import(
              "@/views/singer-details/index.vue" /*webpackChunkName: "SingerDetails"*/
            ),
          meta: {
            title: "歌手详情",
          },
        },
      ],
    },
  ],
};

export default music;
