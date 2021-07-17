/*
 * @Author: NineNan
 * @Date: 2021-06-05 18:59:41
 * @LastEditTime: 2021-07-17 23:38:07
 * @LastEditors: Please set LastEditors
 * @Description: singer store
 * @FilePath: /study_vue03/src/store/modules/singer.ts
 */
import { CACHE_SINGER_INFO, CACHE_ALBUM_INFO } from "@/helpers/constant";
import { ISingerStore, ISingerInfo, IRecommendAlbums } from "@/types/index";
const state: ISingerStore = {
  singerInfo: sessionStorage.getItem(CACHE_SINGER_INFO)
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      JSON.parse(sessionStorage.getItem(CACHE_SINGER_INFO)!)
    : null,
  albumInfo: sessionStorage.getItem(CACHE_ALBUM_INFO)
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      JSON.parse(sessionStorage.getItem(CACHE_ALBUM_INFO)!)
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
};

export default {
  state,
  getters,
  mutations,
};
