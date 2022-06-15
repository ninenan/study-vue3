<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:58:49
 * @LastEditTime: 2021-08-03 21:58:46
 * @LastEditors: Please set LastEditors
 * @Description: ranking-list
 * @FilePath: /study_vue03/src/views/music/ranking-list/index.vue
-->
<template>
  <div class="ranking-list" v-loading="isLoading">
    <scroll class="top-list-content">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic" />
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songList"
              :key="song.id"
            >
              <span>{{ index + 1 }}. </span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedTop" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { Ref, ref, computed } from "vue";
import { useRouter } from "vue-router";
// types
import { IRankList } from "@/types/index";
// components
import Scroll from "@/components/WrapScroll/WrapScroll";
// api
import { getTopList } from "@/api/topList";
// constant
import { CACHE_RANKING_INFO } from "@/helpers/constant";
import { useStore } from "@/store";
// import { TOP_KEY } from "@/assets/js/constant";
// import storage from "good-storage";

interface IRankingList {
  topList: Ref<IRankList[]>;
  isLoading: Ref<boolean>;
  selectedTop: Ref<IRankList | null>;
  selectItem: (item: IRankList) => void;
}

export default {
  name: "rankingList",
  components: {
    scroll: Scroll,
  },
  async setup(): Promise<IRankingList> {
    const router = useRouter();
    const store = useStore();
    const topList = ref<IRankList[]>([]);
    const isLoading = computed(() => {
      return !topList.value?.length;
    });
    const selectedTop = ref<IRankList | null>(null);

    setTimeout(async () => {
      const result = await getTopList<{ topList: IRankList[] }>();
      topList.value = result.topList;
    }, 12000);

    const selectItem = (item: IRankList) => {
      selectedTop.value = item;
      store.commit(CACHE_RANKING_INFO, item);
      router.push({
        name: "rankingDetail",
        params: {
          id: item.id,
          period: item.period,
        },
      });
    };

    return {
      topList,
      isLoading,
      selectedTop,
      selectItem,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
