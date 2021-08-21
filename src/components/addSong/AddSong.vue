<!--
 * @Author: NineNan
 * @Date: 2021-08-18 21:52:09
 * @LastEditTime: 2021-08-21 23:31:46
 * @LastEditors: Please set LastEditors
 * @Description: 添加歌曲
 * @FilePath: /study_vue03/src/components/addSong/AddSong.vue
-->
<template>
  <teleport to="body">
    <transition name="slide">
      <div class="add-song" v-show="visible">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <div class="close" @click="hide">
            <base-svg icon-class="icon-delete" class="icon-close"></base-svg>
          </div>
        </div>
        <div class="search-input-wrapper">
          <search-input v-model="query" placeholder="搜索歌曲"></search-input>
        </div>
        <div v-show="!query">
          <switches
            :items="['最近播放', '搜索历史']"
            v-model="currentIndex"
          ></switches>
          <div class="list-wrapper">
            <scroll
              v-if="currentIndex === 0"
              class="list-scroll"
              ref="scrollRef"
            >
              <div class="list-inner">
                <song-list :songs="playHistory" @select="selectSongBySongList">
                </song-list>
              </div>
            </scroll>
            <scroll
              v-if="currentIndex === 1"
              class="list-scroll"
              ref="scrollRef"
            >
              <div class="list-inner">
                <search-history-list
                  :searches="searchHistory"
                  :show-delete="false"
                  @select="addQuery"
                ></search-history-list>
              </div>
            </scroll>
          </div>
        </div>
        <div class="search-result" v-show="query">
          <suggest
            :query="query"
            :show-singer="false"
            @select-song="selectSongBySuggest"
          >
          </suggest>
        </div>
        <message ref="messageRef">
          <div class="message-title">
            <base-svg icon-class="icon-success" class="icon-success"></base-svg>
            <span class="text">1首歌曲已经添加到播放列表</span>
          </div>
        </message>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
// components
import SearchInput from "@/components/search/SearchInput.vue"; // 歌曲搜索
import Suggest from "@/components/search/Suggest.vue";
import Message from "@/components/base/message/Message.vue";
import Switches from "@/components/switches/Switches.vue";
import SearchHistoryList from "@/components/search/SearchHistoryList.vue";
import Scroll from "@/components/base/scroll/Scroll.vue";
import SongList from "@/components/songList/SongList.vue";
// types
import { ISingerDetailsInfo } from "@/types";
// utils
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  watch,
} from "@vue/runtime-core";
import { useStore } from "@/store";
// hooks
import useSearchHistory from "@/hooks/useSearchHistory";

export default defineComponent({
  name: "addSong",
  components: {
    "search-input": SearchInput,
    suggest: Suggest,
    message: Message,
    switches: Switches,
    "search-history-list": SearchHistoryList,
    scroll: Scroll,
    "song-list": SongList,
  },
  setup() {
    const store = useStore();
    const visible = ref(false);
    const query = ref("");
    const currentIndex = ref(0);
    const scrollRef = ref<HTMLElement | null>(null);
    const messageRef = ref<HTMLElement | null>(null);
    const searchHistory = computed(() => store.state.music.searchHistory);
    const playHistory = computed(() => store.state.music.playHistory);

    watch(query, async () => {
      await nextTick();
      refreshScroll();
    });

    const { saveSearchHistory } = useSearchHistory();

    const refreshScroll = () => {
      (scrollRef.value?.scroll as any).refresh();
    };
    /**
     * 隐藏当前组件
     */
    const hide = () => {
      visible.value = false;
    };
    /**
     * 选择歌曲
     */
    const selectSongBySuggest = (song: ISingerDetailsInfo) => {
      addSong(song);
      saveSearchHistory(query.value);
    };
    /**
     * 添加播放歌曲
     */
    const addSong = (song: ISingerDetailsInfo) => {
      store.dispatch("addSong", song);
      showMessage();
    };
    /**
     * 播放历史选择歌曲
     */
    const selectSongBySongList = ({
      song,
    }: {
      song: ISingerDetailsInfo;
      index: number;
    }) => {
      addSong(song);
    };
    /**
     * 显示当前组件
     */
    const show = () => {
      visible.value = true;
    };
    /**
     * 搜索历史点击
     */
    const addQuery = (song: string) => {
      query.value = song;
    };
    const showMessage = () => {
      (messageRef.value as any).show();
    };

    return {
      visible,
      query,
      currentIndex,
      searchHistory,
      playHistory,
      scrollRef,
      messageRef,
      hide,
      selectSongBySuggest,
      selectSongBySongList,
      show,
      addQuery,
    };
  },
});
</script>
<style lang="scss" scoped>
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 300;
  background: $color-background;
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      .icon-close {
        padding: 12px;
        width: 20px;
        height: 20px;
        color: $color-theme;
      }
    }
  }
  .search-input-wrapper {
    margin: 20px;
  }
  .list-wrapper {
    position: absolute;
    top: 165px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 20px 30px;
      }
    }
  }
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
}

.message-title {
  text-align: center;
  height: 40px;
  box-sizing: border-box;
  @include FlexCenter();
  .icon-success {
    width: 20px;
    height: 20px;
    color: $color-theme;
    margin-right: 5px;
  }
  .text {
    font-size: $font-size-medium;
    color: $color-text;
  }
}
</style>
