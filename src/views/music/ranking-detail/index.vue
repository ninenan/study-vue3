<!--
 * @Author: NineNan
 * @Date: 2021-07-19 22:22:25
 * @LastEditTime: 2021-07-20 23:31:05
 * @LastEditors: Please set LastEditors
 * @Description: 排行榜详情
 * @FilePath: /study_vue03/src/views/music/ranking-detail/index.vue
-->
<template>
  <div class="ranking-detail">
    <music-list
      :songs="songsList"
      :title="title"
      :pic="pic"
      :loading="loading"
      isRank
    />
  </div>
</template>
<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { PropType, ref, computed, Ref } from "vue";
import { getTopDetail } from "@/api/topList";
import { processSongs } from "@/api/song";
import { IRankList, ISingerDetailsInfo } from "@/types/index";
import MusicList from "@components/musicList/MusicList.vue";
import { useStore } from "@/store/index";

interface IProps {
  singer: IRankList | null;
}

interface ISingerDetails {
  songsList: Ref<ISingerDetailsInfo[]>;
  pic: Ref<string | undefined>;
  title: Ref<string | undefined>;
  loading: Ref<boolean>;
  computedSingerInfo: Ref<IRankList | null>;
}

export default {
  name: "SingerDetails",
  components: {
    "music-list": MusicList,
  },
  props: {
    singer: {
      type: Object as PropType<IRankList | null>,
    },
  },
  async setup(props: IProps): Promise<ISingerDetails | undefined> {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const loading = ref(true);
    let songsList = ref<ISingerDetailsInfo[]>([]);
    const cacheInfo = computed(() => store.getters.getRankingInfo);
    const computedSingerInfo = computed(() => {
      let result: IRankList | null = null;
      if (props?.singer?.id) {
        result = props.singer;
      } else {
        if (cacheInfo.value?.id === +route.params.id) {
          result = cacheInfo.value;
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

    const params = {
      id: route.params.id as string,
      period: route.params.period as string,
    };

    const { songs } = await getTopDetail<{ songs: ISingerDetailsInfo[] }>(
      params
    );

    processSongs(songs).then((res) => {
      const processSongsRes = res;
      songsList.value = processSongsRes;
      loading.value = false;
    });

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
.ranking-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
