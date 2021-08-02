<!--
 * @Author: NineNan
 * @Date: 2021-07-17 22:57:36
 * @LastEditTime: 2021-07-18 00:03:30
 * @LastEditors: Please set LastEditors
 * @Description: album-detail
 * @FilePath: \study-vue3\src\views\album-detail\index.vue
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
import { PropType, ref, computed, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store/index";
import { processSongs } from "@/api/song";
import { getAlbumDetail } from "@/api/recommend";
import { IRecommendAlbums, ISingerDetailsInfo } from "@/types/index";
import MusicList from "@components/musicList/MusicList.vue";

export interface ISingerDetailsParams {
  mid: string;
}

interface IProps {
  singer: IRecommendAlbums | null;
}

interface ISingerDetails {
  songsList: Ref<ISingerDetailsInfo[]>;
  pic: Ref<string | undefined>;
  title: Ref<string | undefined>;
  loading: Ref<boolean>;
  computedSingerInfo: Ref<IRecommendAlbums | null>;
}

export default {
  name: "albumDetail",
  components: {
    MusicList,
  },
  props: {
    singer: {
      type: Object as PropType<IRecommendAlbums | null>,
    },
  },
  async setup(props: IProps): Promise<ISingerDetails | undefined> {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const loading = ref(true);
    let songsList = ref<ISingerDetailsInfo[]>([]);
    const computedSingerInfo = computed(() => {
      let result: IRecommendAlbums | null = null;
      if (props?.singer?.id) {
        result = props.singer;
      } else {
        if (store.getters?.getAlbumInfo.id + "" === route.params.id) {
          result = store.getters.getAlbumInfo;
        }
      }
      return result;
    });
    const pic = computed(() => {
      return computedSingerInfo.value?.pic;
    });
    const title = computed(() => {
      return computedSingerInfo.value?.username;
    });

    if (!computedSingerInfo.value) {
      const path = route.matched[0].path;
      router.push({ path });
      return;
    }

    const params = route.params as { id: string };
    const { songs } = await getAlbumDetail<{ songs: ISingerDetailsInfo[] }>(
      params
    );

    const processSongsRes = await processSongs(songs);
    songsList.value = processSongsRes;
    loading.value = false;

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
