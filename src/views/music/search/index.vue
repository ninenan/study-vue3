<!--
 * @Author: NineNan
 * @Date: 2021-05-17 23:00:01
 * @LastEditTime: 2021-08-18 21:26:54
 * @LastEditors: Please set LastEditors
 * @Description: search
 * @FilePath: /study_vue03/src/views/search/index.vue
-->
<template>
  <main class="search">
    <article class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </article>
    <wrap-scroll ref="scrollRef" class="search-content" v-show="!query">
      <article>
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
            @confirm="clearSearchHistory"
          >
          </confirm>
          <search-history-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearchHistory"
          ></search-history-list>
        </div>
      </article>
    </wrap-scroll>
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
import { computed, nextTick, Ref, ref, watch } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
// types
import { IHotKey, ISingerDetailsInfo, ISingerInfo } from "@/types/index";
import { CACHE_SINGER_INFO } from "@/helpers/constant";
// hooks
import useSearchHistory from "@/hooks/useSearchHistory";
import WrapScroll from "@/components/WrapScroll/WrapScroll";
export interface ISearch {
  query: Ref<string>;
  hotKeys: Ref<IHotKey[]>;
  searchHistory: Ref<string[]>;
  selectedSinger: Ref<ISingerInfo | null>;
  confirmRef: Ref<HTMLElement | null>;
  scrollRef: Ref<null | HTMLElement>;
  addQuery: (key: string) => void;
  selectSong: (song: ISingerDetailsInfo) => void;
  selectSinger: (singer: ISingerInfo) => void;
  deleteSearchHistory: (params: string) => void;
  clearSearchHistory: () => void;
  showConfirm: () => void;
}

export default {
  name: "search",
  components: {
    "search-input": SearchInput,
    suggest: Suggest,
    "search-history-list": SearchHistoryList,
    confirm: Confirm,
    "wrap-scroll": WrapScroll,
  },
  setup(): ISearch {
    const store = useStore();
    const router = useRouter();
    const query = ref("");
    const hotKeys = ref<IHotKey[]>([]);
    let selectedSinger = ref<ISingerInfo | null>(null);
    const confirmRef = ref<HTMLElement | null>(null);
    const scrollRef = ref<HTMLElement | null>(null);

    const searchHistory = computed(() => store.state.music.searchHistory);

    getHotKeys<{ hotKeys: IHotKey[] }>().then((res) => {
      hotKeys.value = res.hotKeys;
    });

    watch(query, async (newQuery) => {
      if (!newQuery) {
        await nextTick();
        refreshScroll();
      }
    });

    const refreshScroll = () => {
      (scrollRef.value?.scroll as any).refresh();
    };

    const addQuery = (key: string) => {
      query.value = key;
    };

    const showConfirm = () => {
      ((confirmRef.value as HTMLElement) as any).show();
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

    const {
      saveSearchHistory,
      deleteSearchHistory,
      clearSearchHistory,
    } = useSearchHistory();

    return {
      query,
      hotKeys,
      selectedSinger,
      searchHistory,
      confirmRef,
      scrollRef,
      addQuery,
      selectSong,
      selectSinger,
      deleteSearchHistory,
      clearSearchHistory,
      showConfirm,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
