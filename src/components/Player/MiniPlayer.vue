<!--
 * @Author: your name
 * @Date: 2021-06-29 11:39:01
 * @LastEditTime: 2021-07-04 23:30:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\components\Player\MiniPlayer.vue
-->
<template>
  <transition name="mini">
    <div class="mini-player" v-show="!isFullScreen" @click="showNormalPlayer">
      <div class="cd-wrapper">
        <div ref="cdRef" class="cd">
          <img
            ref="cdImageRef"
            width="40"
            height="40"
            :src="currentSong.pic"
            :class="cdCls"
          />
        </div>
      </div>
      <div ref="sliderWrapperRef" class="slider-wrapper">
        <div class="slider-group">
          <div class="slider-page" v-for="song in playlist" :key="song.id">
            <h2 class="name">{{ song.name }}</h2>
            <p class="desc">{{ song.singer }}</p>
          </div>
        </div>
      </div>
      <div class="control">
        <progress-circle :radius="32" :progress="progress">
          <base-svg
            class="icon-mini"
            :icon-class="miniPlayIcon"
            @click.stop="togglePlay"
          ></base-svg>
        </progress-circle>
      </div>
      <div class="control" @click.stop="showPlayList">
        <base-svg icon-class="icon-playlist" class="icon-playlist"></base-svg>
      </div>
      <playlist ref="playlistRef"></playlist>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store";
// components
import ProgressCircle from "./ProgressCircle.vue";
import Playlist from "./Playlist.vue";
// hooks
import useCd from "@/hooks/useCd";
import useMiddleSlider from "@/hooks/useMiddleSlider";
// helpers
import { SET_FULL_SCREEN } from "@/helpers/constant";

export default defineComponent({
  name: "miniPlayer",
  components: {
    "progress-circle": ProgressCircle,
    playlist: Playlist,
  },
  props: {
    progress: {
      type: Number,
      default: 0,
    },
    togglePlay: {
      type: Function,
    },
  },
  setup() {
    const store = useStore();
    const isFullScreen = computed(() => store.state.music.isFullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playlist = computed(() => store.state.music.playList);
    const isPlaying = computed(() => store.state.music.isPlaying);
    const miniPlayIcon = computed(() => {
      console.log("isPlaying.value :>> ", isPlaying.value);
      return isPlaying.value ? "icon-playing" : "icon-play";
    });
    const playlistRef = ref<HTMLElement | null>(null);

    // hooks
    const { cdCls, cdRef, cdImageRef } = useCd();
    const { sliderWrapperRef } = useMiddleSlider();

    /**
     * 全屏播放
     */
    function showNormalPlayer() {
      store.commit(SET_FULL_SCREEN, true);
    }

    function showPlayList() {
      if (playlistRef.value) {
        (playlistRef.value as any).show();
      }
    }

    return {
      isFullScreen,
      currentSong,
      playlist,
      miniPlayIcon,
      playlistRef,
      showNormalPlayer,
      showPlayList,
      // useCd
      cdCls,
      cdRef,
      cdImageRef,
      // useMiddleSlider
      sliderWrapperRef,
    };
  },
});
</script>
<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      height: 100%;
      width: 100%;
      img {
        border-radius: 50%;
        &.playing {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .icon-playlist {
      position: relative;
      top: -2px;
      width: 28px;
      height: 28px;
      color: $color-theme;
    }
    .icon-mini {
      position: absolute;
      left: 16px;
      top: 16px;
      color: $color-theme;
      width: 16px;
      height: 16px;
      transform: translate(-50%, -50%);
    }
  }
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
