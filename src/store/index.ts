/*
 * @Author: NineNan
 * @Date: 2021-05-07 20:58:58
 * @LastEditTime: 2021-05-11 23:00:10
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
    addCount: async ({ dispatch, commit }, payload: number): Promise<void> => {
      await dispatch("addCountA");
      await dispatch("addCountB");
      commit(ADD_COUNT, payload);
    },
    addCountA: ({ commit }): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit(ADD_COUNT, 5);
        }, 500);
        resolve();
      });
    },
    addCountB: ({ commit }): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit(ADD_COUNT, 5);
        }, 500);
        resolve();
      });
    },
  },
  modules: {},
});
