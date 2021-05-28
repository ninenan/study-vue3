<!--
 * @Author: NineNan
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-05-28 14:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\views\Home.vue
-->
<template>
  <div class="home">
    <!-- <img alt="Vue logo" :src="imgSrc" /> -->
    <!-- <p class="mb-20">环境变量: {{ env.NODE_ENV }}</p> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { IEnv } from "@/types";

interface IHome {
  imgSrc: string;
  env: IEnv;
}
export default {
  setup(): IHome {
    const env: IEnv = process.env;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imgSrc = require("@assets/img/logo.png");
    return {
      imgSrc,
      env,
    };
  },
};
</script>
<style lang="scss">
.home {
  color: $themeColor;
  @include FlexCenter();
  flex-direction: column;
}
</style>
