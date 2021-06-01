<!--
 * @Author: NineNan
 * @Date: 2021-06-01 01:00:15
 * @LastEditTime: 2021-06-01 16:44:58
 * @LastEditors: Please set LastEditors
 * @Description: SingerDetails
 * @FilePath: \study-vue3\src\views\singer\SingerDetails.vue
-->
<template>
  <div class="singer-details">
    <h1>singer-details</h1>
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { getSingerDetails } from "@/api/singer";
import { processSongs } from "@/api/song";

export interface ISingerDetailsParams {
  mid: string;
}

export interface ISingerDetailsRes {
  album: string;
  duration: number;
  id: number;
  mid: string;
  name: string;
  pic: string;
  singer: string;
  url: string;
}

export default {
  async setup(): Promise<void> {
    const route = useRoute();
    const params: ISingerDetailsParams = {
      mid: route.params.mid as string,
    };

    const { songs } = await getSingerDetails<{ songs: ISingerDetailsRes[] }>(
      params
    );

    const res = await processSongs(songs);
    console.log("res111 :>> ", res);
  },
};
</script>
<style lang="scss" scoped>
.singer-details {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
