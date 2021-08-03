<!--
 * @Author: NineNan
 * @Date: 2021-08-03 22:06:39
 * @LastEditTime: 2021-08-03 23:28:28
 * @LastEditors: Please set LastEditors
 * @Description: suggest
 * @FilePath: /study_vue03/src/components/search/Suggest.vue
-->
<template>
  <article class="suggest" v-loading="isShowLoading">
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <base-svg icon-class="icon-mine" class="icon-mine"></base-svg>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <base-svg icon-class="icon-music" class="icon-mine"></base-svg>
        </div>
        <div class="name">
          <p class="text">{{ song.singer }}-{{ song.name }}</p>
        </div>
      </li>
    </ul>
  </article>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
// api
import { search } from "@/api/search";
import { processSongs } from "@/api/song";
// types
import { ISingerDetailsInfo, ISingerInfo } from "@/types/index";

export default defineComponent({
  name: "suggest",
  props: {
    query: {
      type: String,
      default: "",
    },
    isShowSinger: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["select-song", "select-singer"],
  setup(props, { emit }) {
    const singer = ref<ISingerInfo | undefined>(undefined);
    const songs = ref<any>([]);
    const hasMore = ref(true);
    const page = ref(1);

    const isShowLoading = computed(() => !singer.value && !songs.value.length);

    watch(
      () => props.query,
      async (newQuery) => {
        if (!newQuery) {
          return;
        }
        console.log("newQuery :>> ", newQuery);
        resetData();
        await searchData();
      }
    );

    /**
     * 重置数据
     */
    const resetData = () => {
      page.value = 1;
      singer.value = undefined;
      songs.value = [];
      hasMore.value = true;
    };

    /**
     * 搜索数据
     */
    const searchData = async () => {
      const response = await search<{
        songs: ISingerDetailsInfo[];
        hasMore: boolean;
        singer?: ISingerInfo;
      }>(props.query, page.value, props.isShowSinger);

      songs.value = await processSongs(response.songs);
      singer.value = response.singer;
      hasMore.value = response.hasMore;
      console.log("response :>> ", response);
    };

    const selectSong = (song: any) => {
      emit("select-song", song);
    };
    const selectSinger = (singer: any) => {
      emit("select-singer", singer);
    };

    return {
      singer,
      songs,
      hasMore,
      page,
      isShowLoading,
      selectSong,
      selectSinger,
    };
  },
});
</script>
<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        .svg-icon {
          width: 14px;
          height: 14px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
