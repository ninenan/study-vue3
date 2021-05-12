/*
 * @Author: NineNan
 * @Date: 2021-05-07 20:58:58
 * @LastEditTime: 2021-05-12 10:52:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/store/index.ts
 */
import { createStore } from "vuex";

const modulesFiles = require.context("./modules", true, /\.ts$/);
const modules: any = modulesFiles.keys().reduce((modules: any, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default createStore({
  modules,
});
