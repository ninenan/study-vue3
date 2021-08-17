<!--
 * @Author: NineNan
 * @Date: 2021-05-17 23:00:01
 * @LastEditTime: 2021-08-17 23:38:06
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
      <div class="search-history" v-show="searchHistory.length">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span class="clear" @click="showConfirm">
            <base-svg icon-class="icon-clear"></base-svg>
          </span>
        </h1>
        <confirm
          ref="confirmRef"
          text="是否清空所有搜索历史"
          confirm-btn-text="清空"
          @confirm="clearSearch"
        >
        </confirm>
        <search-history-list
          :searches="searchHistory"
          @select="addQuery"
          @delete="deleteSearchHistory"
        ></search-history-list>
      </div>
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
import SearchHistoryList from "@/components/search/SearchHistoryList.vue";
import Confirm from "@/components/base/confirm/Confirm.vue";
// api
import { getHotKeys } from "@/api/search";
// utils
import { computed, Ref, ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
// types
import { IHotKey, ISingerDetailsInfo, ISingerInfo } from "@/types/index";
import { CACHE_SINGER_INFO } from "@/helpers/constant";
// hooks
import useSearchHistory from "@/hooks/useSearchHistory";
export interface ISearch {
  query: Ref<string>;
  hotKeys: Ref<IHotKey[]>;
  searchHistory: Ref<string[]>;
  addQuery: (key: string) => void;
  selectSong: (song: ISingerDetailsInfo) => void;
  selectSinger: (singer: ISingerInfo) => void;
  selectedSinger: Ref<ISingerInfo | null>;
  clearSearch: () => void;
  deleteSearchHistory: (params: string) => void;
  showConfirm: () => void;
}

export default {
  name: "search",
  components: {
    "search-input": SearchInput,
    suggest: Suggest,
    "search-history-list": SearchHistoryList,
    confirm: Confirm,
  },
  setup(): ISearch {
    const store = useStore();
    const router = useRouter();
    const query = ref("");
    const hotKeys = ref<IHotKey[]>([]);
    let selectedSinger = ref<ISingerInfo | null>(null);

    const searchHistory = computed(() => store.state.music.searchHistory);

    getHotKeys<{ hotKeys: IHotKey[] }>().then((res) => {
      hotKeys.value = res.hotKeys;
    });

    const { saveSearchHistory, deleteSearchHistory } = useSearchHistory();

    const addQuery = (key: string) => {
      query.value = key;
    };
    const clearSearch = () => {
      //
    };
    const showConfirm = () => {
      //
    };
    /**
     * 添加播放歌曲
     */
    const selectSong = (song: ISingerDetailsInfo) => {
      saveSearchHistory(query.value);
      store.dispatch("addSong", song);
    };
    /**
     * 选择歌手
     */
    const selectSinger = (singer: ISingerInfo) => {
      saveSearchHistory(query.value);
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
      searchHistory,
      addQuery,
      selectSong,
      selectSinger,
      clearSearch,
      deleteSearchHistory,
      showConfirm,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
