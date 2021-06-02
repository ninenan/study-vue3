<!--
 * @Author: NineNan
 * @Date: 2021-06-01 23:01:49
 * @LastEditTime: 2021-06-03 00:05:16
 * @LastEditors: Please set LastEditors
 * @Description: MusicList
 * @FilePath: /study_vue03/src/components/musicList/MusicList.vue
-->
<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <base-svg iconClass="arrowLeft" class="icon-back" />
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper">
        <div v-show="songs.length > 0" class="play-btn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      :probe-type="3"
      v-loading="loading"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from "@/components/songList/SongList.vue";
import Scroll from "@/components/base/scroll/Scroll.vue";
import { useRouter } from "vue-router";
import { defineComponent, computed, onMounted, ref } from "vue";

export default defineComponent({
  name: "music-list",
  components: {
    SongList,
    Scroll,
  },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    title: String,
    pic: String,
    loading: Boolean,
  },
  setup(props) {
    const router = useRouter();
    const imageHeight = ref(0);
    const bgImage = ref(null);
    const bgImageStyle = computed(() => {
      return {
        backgroundImage: `url(${props.pic})`,
      };
    });
    const scrollStyle = computed(() => {
      return {
        top: `${imageHeight.value}px`,
      };
    });

    onMounted(() => {
      imageHeight.value = bgImage.value?.clientHeight;
    });
    const goBack = () => {
      router.back();
    };
    const onScroll = () => {
      //
    };
    const random = () => {
      //
    };
    const selectItem = () => {
      //
    };

    return {
      goBack,
      onScroll,
      random,
      selectItem,
      bgImage,
      bgImageStyle,
      scrollStyle,
      imageHeight,
    };
  },
});
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      padding: 10px;
      box-sizing: content-box;
      color: $color-theme;
      width: 20px;
      height: 20px;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    padding-top: 70%;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    overflow: hidden;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
