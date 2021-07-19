/*
 * @Author: NineNan
 * @Date: 2021-06-05 18:59:41
 * @LastEditTime: 2021-07-19 23:06:57
 * @LastEditors: Please set LastEditors
 * @Description: singer store
 * @FilePath: /study_vue03/src/store/modules/singer.ts
 */
import {
  CACHE_SINGER_INFO,
  CACHE_ALBUM_INFO,
  CACHE_RANKING_INFO,
} from "@/helpers/constant";
import {
  ISingerStore,
  ISingerInfo,
  IRecommendAlbums,
  IRankList,
} from "@/types/index";
const state: ISingerStore = {
  singerInfo: sessionStorage.getItem(CACHE_SINGER_INFO)
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      JSON.parse(sessionStorage.getItem(CACHE_SINGER_INFO)!)
    : null,
  albumInfo: sessionStorage.getItem(CACHE_ALBUM_INFO)
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      JSON.parse(sessionStorage.getItem(CACHE_ALBUM_INFO)!)
    : null,
  rankingInfo: sessionStorage.getItem(CACHE_RANKING_INFO)
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      JSON.parse(sessionStorage.getItem(CACHE_RANKING_INFO)!)
    : null,
};

const getters = {
  getSingerInfo: (state: ISingerStore): ISingerInfo | null => {
    return state.singerInfo;
  },
  /**
   * 获取本地 album 缓存
   * @param state
   * @returns
   */
  getAlbumInfo: (state: ISingerStore): IRecommendAlbums | null => {
    return state.albumInfo;
  },
  /**
   * 获取本地 ranking 缓存
   * @param state
   * @returns
   */
  getRankingInfo: (state: ISingerStore): IRankList | null => {
    return state.rankingInfo;
  },
};

const mutations = {
  [CACHE_SINGER_INFO]: (state: ISingerStore, payload: ISingerInfo): void => {
    state.singerInfo = payload;
    sessionStorage.setItem(CACHE_SINGER_INFO, JSON.stringify(payload));
  },
  /**
   * 保存 album 详情本地缓存
   * @param state
   * @param payload
   */
  [CACHE_ALBUM_INFO]: (state: ISingerStore, payload: ISingerInfo): void => {
    state.singerInfo = payload;
    sessionStorage.setItem(CACHE_ALBUM_INFO, JSON.stringify(payload));
  },
  /**
   * 保存 ranking 详情本地缓存
   * @param state
   * @param payload
   */
  [CACHE_RANKING_INFO]: (state: ISingerStore, payload: IRankList): void => {
    state.rankingInfo = payload;
    sessionStorage.setItem(CACHE_RANKING_INFO, JSON.stringify(payload));
  },
};

export default {
  state,
  getters,
  mutations,
};
