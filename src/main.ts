/*
 * @Author: NineNan
 * @Date: 2021-05-07 20:58:58
 * @LastEditTime: 2021-06-02 17:24:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/main.ts
 */
import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store, { storeKey } from "./store";
import lazyPlugin from "vue3-lazy";
import "@/assets/style/index.scss";
import loadingDirective from "@/directive/loadingDirective";
import moneyFormat from "@/directive/moneyFormat";
import BaseSvg from "@/components/base/BaseSvg/BaseSvg.vue"; // 注册全局svg组件

const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);
const iconReq = require.context("@/assets/icons", false, /\.svg$/);
requireAll(iconReq); // 导入全局svg

const app = createApp(App);

app
  .use(Antd)
  .use(store, storeKey)
  .use(router)
  .use(lazyPlugin, {
    loading: require("@/assets/img/music.jpg"),
  })
  .directive("loading", loadingDirective)
  .directive("moneyFormat", moneyFormat)
  .component("BaseSvg", BaseSvg)
  .mount("#app");
