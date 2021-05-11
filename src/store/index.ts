/*
 * @Author: NineNan
 * @Date: 2021-05-07 20:58:58
 * @LastEditTime: 2021-05-11 22:48:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/store/index.ts
 */
import { createStore } from "vuex";
import { ADD_COUNT } from "@/helpers/constant";

export default createStore({
  state: {
    count: 0,
  },
  getters: {
    isGreaterTen: (state): boolean => {
      return state.count > 10;
    },
  },
  mutations: {
    [ADD_COUNT]: (state, payload: number): void => {
      state.count = state.count + payload;
    },
  },
  actions: {
    addCount: ({ commit }, payload: number): void => {
      commit(ADD_COUNT, payload);
    },
  },
  modules: {},
});
