<!--
 * @Author: NineNan
 * @Date: 2021-06-01 01:00:15
 * @LastEditTime: 2021-06-05 21:29:33
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
import { useRoute, useRouter } from "vue-router";
import { PropType, ref, computed, Ref } from "vue";
import { getSingerDetails } from "@/api/singer";
import { processSongs } from "@/api/song";
import { ISingerInfo } from "@/types/index";
import MusicList from "@components/musicList/MusicList.vue";
import { useStore } from "@/store/index";

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
  singer: ISingerInfo | null;
}

interface ISingerDetails {
  songsList: Ref<ISingerDetailsRes[]>;
  pic: Ref<string | undefined>;
  title: Ref<string | undefined>;
  loading: Ref<boolean>;
  computedSingerInfo: Ref<ISingerInfo | null>;
}

export default {
  name: "SingerDetails",
  components: {
    MusicList,
  },
  props: {
    singer: {
      type: Object as PropType<ISingerInfo | null>,
    },
  },
  async setup(props: IProps): Promise<ISingerDetails | undefined> {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const loading = ref(true);
    let songsList = ref<ISingerDetailsRes[]>([]);
    const computedSingerInfo = computed(() => {
      let result: ISingerInfo | null = null;
      if (props?.singer?.id) {
        result = props.singer;
      } else {
        if (
          store.getters.getSingerInfo &&
          store.getters.getSingerInfo.mid === route.params.mid
        ) {
          result = store.getters.getSingerInfo;
        }
      }
      return result;
    });
    const pic = computed(() => {
      return computedSingerInfo.value?.pic;
    });
    const title = computed(() => {
      return computedSingerInfo.value?.name;
    });

    if (!computedSingerInfo.value) {
      const path = route.matched[0].path;
      router.push({ path });
      return;
    }

    const params: ISingerDetailsParams = {
      mid: route.params.mid as string,
    };
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
      pic,
      title,
      loading,
      songsList,
      computedSingerInfo,
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
