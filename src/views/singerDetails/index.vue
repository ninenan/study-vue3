<!--
 * @Author: NineNan
 * @Date: 2021-06-01 01:00:15
 * @LastEditTime: 2021-06-02 23:11:06
 * @LastEditors: Please set LastEditors
 * @Description: SingerDetails
 * @FilePath: \study-vue3\src\views\singer\SingerDetails.vue
-->
<template>
  <div class="singer-details">
    <MusicList :songs="songs" :title="title" :pic="pic" />
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { PropType, ref, computed } from "vue";
import { getSingerDetails } from "@/api/singer";
import { processSongs } from "@/api/song";
import { ISingerInfo } from "@/types/index";
import MusicList from "@components/musicList/MusicList.vue";

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
  name: "SingerDetails",
  components: {
    MusicList,
  },
  props: {
    singer: Object as PropType<ISingerInfo>,
  },
  async setup(props: any) {
    const route = useRoute();
    let songs = ref<any[]>([]);
    const params: ISingerDetailsParams = {
      mid: route.params.mid as string,
    };
    const pic = computed(() => {
      return props.singer?.pic;
    });
    const title = computed(() => {
      return props.singer?.name;
    });

    const res = await getSingerDetails<{ songs: ISingerDetailsRes[] }>(params);
    const processSongsRes = await processSongs(res.songs);
    songs.value = processSongsRes;
    console.log("songs :>> ", songs);

    return {
      songs,
      pic,
      title,
    };
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
