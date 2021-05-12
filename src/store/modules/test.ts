/*
 * @Author: NineNan
 * @Date: 2021-05-12 10:14:22
 * @LastEditTime: 2021-05-12 10:27:44
 * @LastEditors: Please set LastEditors
 * @Description: vuex test
 * @FilePath: \study-vue3\src\store\modules\test.ts
 */
import { ITestSore } from "@/types";
import { ADD_COUNT } from "@/helpers/constant";
import { ActionContext } from "vuex";

const state: ITestSore = {
  count: 0,
};

const getters = {
  isGreaterTen: (state: ITestSore): boolean => {
    return state.count > 10;
  },
};

const mutations = {
  [ADD_COUNT]: (state: ITestSore, payload: number): void => {
    state.count = state.count + payload;
  },
};

const actions = {
  addCount: async (
    context: ActionContext<ITestSore, ITestSore>,
    payload: number
  ): Promise<void> => {
    await context.dispatch("addCountA");
    await context.dispatch("addCountB");
    context.commit(ADD_COUNT, payload);
  },
  addCountA: (context: ActionContext<ITestSore, ITestSore>): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        context.commit(ADD_COUNT, 5);
        resolve();
      }, 500);
    });
  },
  addCountB: (context: ActionContext<ITestSore, ITestSore>): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        context.commit(ADD_COUNT, 5);
        resolve();
      }, 500);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
