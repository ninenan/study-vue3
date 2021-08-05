<!--
 * @Author: NineNan
 * @Date: 2021-05-17 23:00:01
 * @LastEditTime: 2021-08-05 23:16:10
 * @LastEditors: Please set LastEditors
 * @Description: search
 * @FilePath: /study_vue03/src/views/search/index.vue
-->
<template>
  <main class="search">
    <article class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </article>
    <article class="search-content" v-show="!query">
      <section class="hot-keys">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li
            v-for="item in hotKeys"
            :key="item.id"
            class="item"
            @click="addQuery(item.key)"
          >
            {{ item.key }}
          </li>
        </ul>
      </section>
    </article>
    <article class="search-result" v-show="query">
      <suggest
        :query="query"
        @select-song="selectSong"
        @select-singer="selectSinger"
      ></suggest>
    </article>
    <Suspense>
      <template #default>
        <router-view v-slot="{ Component }">
          <transition appear name="slide">
            <component :is="Component" :singer="selectedSinger" />
          </transition>
        </router-view>
      </template>
    </Suspense>
  </main>
</template>
<script lang="ts">
// components
import SearchInput from "@/components/search/SearchInput.vue";
import Suggest from "@/components/search/Suggest.vue";
// api
import { getHotKeys } from "@/api/search";
import { Ref, ref, watch } from "vue";
// types
import { IHotKey, ISingerDetailsInfo, ISingerInfo } from "@/types/index";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { CACHE_SINGER_INFO } from "@/helpers/constant";
export interface ISearch {
  query: Ref<string>;
  hotKeys: Ref<IHotKey[]>;
  addQuery: (key: string) => void;
  selectSong: (song: ISingerDetailsInfo) => void;
  selectSinger: (singer: ISingerInfo) => void;
  selectedSinger: Ref<ISingerInfo | null>;
}

export default {
  name: "search",
  components: {
    "search-input": SearchInput,
    suggest: Suggest,
  },
  setup(): ISearch {
    const store = useStore();
    const router = useRouter();
    const query = ref("");
    const hotKeys = ref<IHotKey[]>([]);
    let selectedSinger = ref<ISingerInfo | null>(null);

    getHotKeys<{ hotKeys: IHotKey[] }>().then((res) => {
      hotKeys.value = res.hotKeys;
    });

    const addQuery = (key: string) => {
      query.value = key;
    };
    /**
     * 添加播放歌曲
     */
    const selectSong = (song: ISingerDetailsInfo) => {
      store.dispatch("addSong", song);
    };
    /**
     * 选择歌手
     */
    const selectSinger = (singer: ISingerInfo) => {
      selectedSinger.value = singer;
      store.commit(CACHE_SINGER_INFO, singer);
      router.push({
        name: "SearchSingerDetails",
        params: {
          mid: singer.mid,
        },
      });
    };

    return {
      query,
      hotKeys,
      selectedSinger,
      addQuery,
      selectSong,
      selectSinger,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
