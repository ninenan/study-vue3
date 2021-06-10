<!--
 * @Author: NineNan
 * @Date: 2021-06-01 23:15:13
 * @LastEditTime: 2021-06-10 23:09:37
 * @LastEditors: Please set LastEditors
 * @Description: SongList
 * @FilePath: /study_vue03/src/components/songList/SongList.vue
-->
<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectItem(song, index)"
    >
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getDesc(song) }}</p>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import { PropType } from "vue";
import { ISingerDetailsInfo } from "@/types/index";

interface ISongList {
  getDesc: (song: ISingerDetailsInfo) => string;
  selectItem: (song: ISingerDetailsInfo, index: number) => void;
}

export default {
  props: {
    songs: {
      type: Array as PropType<ISingerDetailsInfo[]>,
      required: true,
    },
  },
  emits: ["select"],
  setup(props: { songs: ISingerDetailsInfo[] }, context: any): ISongList {
    const getDesc = (song: ISingerDetailsInfo) => {
      return `${song.singer}·${song.album}`;
    };
    const selectItem = (song: ISingerDetailsInfo, index: number): void => {
      context?.emit("select", {
        song,
        index,
      });
    };

    return {
      getDesc,
      selectItem,
    };
  },
};
</script>
<style lang="scss" scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    // .rank {
    //   flex: 0 0 25px;
    //   width: 25px;
    //   margin-right: 20px;
    //   text-align: center;
    //   .icon {
    //     display: inline-block;
    //     width: 25px;
    //     height: 24px;
    //     background-size: 25px 24px;
    //     &.icon0 {
    //       @include bg-image("first");
    //     }
    //     &.icon1 {
    //       @include bg-image("second");
    //     }
    //     &.icon2 {
    //       @include bg-image("third");
    //     }
    //   }
    //   .text {
    //     color: $color-theme;
    //     font-size: $font-size-large;
    //   }
    // }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include no-wrap();
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
  }
}
</style>
