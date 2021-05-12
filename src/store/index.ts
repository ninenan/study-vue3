/*
 * @Author: NineNan
 * @Date: 2021-05-07 20:58:58
 * @LastEditTime: 2021-05-12 15:15:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/store/index.ts
 */
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import { IStore } from "@/types";

export const storeKey: InjectionKey<Store<IStore>> = Symbol();

const modulesFiles = require.context("./modules", true, /\.ts$/);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modules: any = modulesFiles.keys().reduce((modules: any, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = createStore<IStore>({
  modules,
  strict: process.env.NODE_ENV !== "production",
});

export const useStore = (): Store<IStore> => {
  return baseUseStore(storeKey);
  // return baseUseStore<IStore>();
};

export default store;
