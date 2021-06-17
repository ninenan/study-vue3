<template>
  <div class="player" v-show="playlist.length">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" />
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <base-svg iconClass="icon-arrow-left" class="icon-back"></base-svg>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
            <base-svg icon-class="icon-prev-song" class="icon-play"></base-svg>
          </div>
          <div class="icon i-left" :class="disableCls">
            <base-svg
              icon-class="icon-prev-song"
              class="icon-play"
              @click="prevPlay"
            ></base-svg>
          </div>
          <div class="icon i-center" :class="disableCls">
            <base-svg
              :icon-class="playIcon"
              class="icon-play"
              @click="switchPlay"
            ></base-svg>
          </div>
          <div class="icon i-right" :class="disableCls">
            <base-svg
              icon-class="icon-next-song"
              class="icon-play"
              @click="nextPlay"
            ></base-svg>
          </div>
          <div class="icon i-right">
            <base-svg icon-class="icon-love" class="icon-play"></base-svg>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="songReady"
      @error="songPlayError"
    ></audio>
  </div>
</template>

<script lang="ts">
import {
  SET_FULL_SCREEN,
  SET_PLAYING_STATUE,
  SET_CURRENT_INDEX,
} from "@/helpers/constant";
import { computed, Ref, ref, watch } from "vue";
import { useStore } from "@/store/index";
import { ISingerDetailsInfo } from "@/types/index";

interface IPlayer {
  playlist: Ref<ISingerDetailsInfo[]>;
  currentSong: Ref<ISingerDetailsInfo>;
  goBack: () => void;
  fullScreen: Ref<boolean>;
  audioRef: Ref<HTMLMediaElement | null>;
  disableCls: Ref<string>;
  switchPlay: () => void;
  pause: () => void;
  playIcon: Ref<string>;
  prevPlay: () => void;
  nextPlay: () => void;
  songReady: () => void;
  songPlayError: () => void;
}

export default {
  name: "player",
  setup(): IPlayer {
    const store = useStore();
    const audioRef = ref<HTMLMediaElement | null>(null);
    const isSongReady = ref(false);

    const fullScreen = computed(() => store.state.music.isFullScreen);
    const currentSong = computed(() => store.getters.currentSong);
    const playlist = computed(() => store.state.music.playList);
    const isPlaying = computed(() => store.state.music.isPlaying);
    const playIcon = computed(() =>
      isPlaying.value ? "icon-playing" : "icon-play"
    );
    const currentIndex = computed(() => store.state.music.currentIndex);
    const disableCls = computed(() => (isSongReady.value ? "" : "disabled"));

    watch(currentSong, (newSong: ISingerDetailsInfo) => {
      if (!newSong.id || !newSong.url) {
        return;
      }

      const audioEl = audioRef.value as HTMLMediaElement;
      audioEl.src = newSong.url;
      audioEl.play();
      isSongReady.value = false;
    });

    watch(isPlaying, (newIsPlaying) => {
      if (audioRef.value) {
        if (!isSongReady.value) {
          return;
        }
        const audioEl = audioRef.value;
        newIsPlaying ? audioEl.play() : audioEl.pause();
      }
    });
    /**
     * 返回
     */
    const goBack = () => {
      store.commit(SET_FULL_SCREEN, false);
    };
    /**
     * 切换播放
     */
    const switchPlay = () => {
      if (!isSongReady.value) {
        return;
      }
      store.commit(SET_PLAYING_STATUE, !isPlaying.value);
    };
    /**
     * 歌曲暂停
     */
    const pause = () => {
      store.commit(SET_PLAYING_STATUE, false);
    };
    /**
     * 上一首
     */
    const prevPlay = () => {
      const list = playlist.value;

      if (!list.length || !isSongReady.value) {
        return;
      }
      if (list.length === 1) {
        loop();
      } else {
        let index = currentIndex.value - 1;
        if (index === -1) {
          index = list.length - 1;
        }
        store.commit(SET_CURRENT_INDEX, index);
        !isPlaying.value && store.commit(SET_PLAYING_STATUE, true);
      }
    };
    /**
     * 下一首
     */
    const nextPlay = () => {
      const list = playlist.value;

      if (!list.length || !isSongReady.value) {
        return;
      }
      if (list.length === 1) {
        loop();
      } else {
        let index = currentIndex.value + 1;
        if (index === list.length) {
          index = 0;
        }
        store.commit(SET_CURRENT_INDEX, index);
        !isPlaying.value && store.commit(SET_PLAYING_STATUE, true);
      }
    };
    /**
     * 循环播放
     */
    const loop = () => {
      const audioEl = audioRef.value;
      if (audioEl) {
        audioEl.currentTime = 0;
        audioEl.play();
      }
    };
    /**
     * 歌曲是否可以播放
     */
    const songReady = () => {
      if (isSongReady.value) {
        return;
      }
      isSongReady.value = true;
    };
    /**
     * 歌曲播放失败
     */
    const songPlayError = () => {
      isSongReady.value = true;
    };
    return {
      playlist,
      currentSong,
      fullScreen,
      audioRef,
      disableCls,
      goBack,
      switchPlay,
      pause,
      playIcon,
      prevPlay,
      nextPlay,
      songReady,
      songPlayError,
    };
  },
};
</script>

<style lang="scss" scoped>
.player {
  .operators {
    display: flex;
    align-items: center;
  }
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        width: 20px;
        height: 20px;
      }
      .icon-back {
        padding: 9px;
        box-sizing: content-box;
        color: $color-theme;
        transform: rotate(-90deg);
        width: 20px;
        height: 20px;
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disabled {
            color: $color-theme-d;
          }
          .icon-play {
            width: 30px;
            height: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>
