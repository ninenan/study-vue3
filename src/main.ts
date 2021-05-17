/*
 * @Author: NineNan
 * @Date: 2021-05-07 20:58:58
 * @LastEditTime: 2021-05-17 21:47:11
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
import "@/assets/style/index.scss";

const app = createApp(App);

app.use(Antd).use(store, storeKey).use(router).mount("#app");
