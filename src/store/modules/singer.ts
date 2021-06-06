/*
 * @Author: NineNan
 * @Date: 2021-06-05 18:59:41
 * @LastEditTime: 2021-06-06 19:43:03
 * @LastEditors: Please set LastEditors
 * @Description: singer store
 * @FilePath: /study_vue03/src/store/modules/singer.ts
 */
import { CACHE_SINGER_INFO } from "@/helpers/constant";
import { ISingerStore, ISingerInfo } from "@/types/index";
const state: ISingerStore = {
  singerInfo: sessionStorage.getItem(CACHE_SINGER_INFO)
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      JSON.parse(sessionStorage.getItem(CACHE_SINGER_INFO)!)
    : null,
};

const getters = {
  getSingerInfo: (state: ISingerStore): ISingerInfo | null => {
    return state.singerInfo;
  },
};

const mutations = {
  [CACHE_SINGER_INFO]: (state: ISingerStore, payload: ISingerInfo): void => {
    state.singerInfo = payload;
    sessionStorage.setItem(CACHE_SINGER_INFO, JSON.stringify(payload));
  },
};

export default {
  state,
  getters,
  mutations,
};
