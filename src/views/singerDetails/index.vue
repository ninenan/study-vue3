<!--
 * @Author: NineNan
 * @Date: 2021-06-01 01:00:15
 * @LastEditTime: 2021-06-04 16:15:16
 * @LastEditors: Please set LastEditors
 * @Description: SingerDetails
 * @FilePath: \study-vue3\src\views\singer\SingerDetails.vue
-->
<template>
  <div class="singer-details">
    <MusicList
      :songs="songsList"
      :title="title"
      :pic="pic"
      :loading="loading"
    />
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

interface IProps {
  singer: ISingerInfo;
}

export default {
  name: "SingerDetails",
  components: {
    MusicList,
  },
  props: {
    singer: {
      type: Object as PropType<ISingerInfo>,
      required: true,
    },
  },
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  async setup(props: IProps) {
    const route = useRoute();
    let songsList = ref<ISingerDetailsRes[]>([]);
    const params: ISingerDetailsParams = {
      mid: route.params.mid as string,
    };
    const loading = ref(true);
    const pic = computed(() => {
      return props.singer?.pic;
    });
    const title = computed(() => {
      return props.singer?.name;
    });

    const { songs } = await getSingerDetails<{ songs: ISingerDetailsRes[] }>(
      params
    );
    processSongs(songs).then((res) => {
      const processSongsRes = res;
      songsList.value = processSongsRes;
      loading.value = false;
    });
    // setTimeout(async () => {
    //   const processSongsRes = await processSongs(songs);
    //   songsList.value = processSongsRes;
    //   loading.value = false;
    // }, 500);
    return {
      songs,
      pic,
      title,
      loading,
      songsList,
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
