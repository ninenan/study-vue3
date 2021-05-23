/*
 * @Author: NineNan
 * @Date: 2021-05-07 20:58:58
 * @LastEditTime: 2021-05-23 15:21:55
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

const app = createApp(App);

app
  .use(Antd)
  .use(store, storeKey)
  .use(router)
  .use(lazyPlugin, {
    loading: require("@/assets/img/music.jpg"),
  })
  .mount("#app");
