<!--
 * @Author: NineNan
 * @Date: 2021-06-01 23:01:49
 * @LastEditTime: 2021-08-02 22:24:01
 * @LastEditors: Please set LastEditors
 * @Description: MusicList
 * @FilePath: /study_vue03/src/components/musicList/MusicList.vue
-->
<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <base-svg icon-class="icon-arrow-left" class="icon-back" />
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="palyBtnStyle">
        <div v-show="songs.length > 0" class="play-btn" @click="random">
          <base-svg icon-class="icon-play" class="icon-play" />
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      :probe-type="3"
      v-loading="loading"
      v-no-result:[noResultText]="isShowNoResult"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          @select="selectItem"
          :is-rank="isRank"
        ></song-list>
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
import SongList from "@/components/songList/SongList.vue";
// import Scroll from "@/components/base/scroll/Scroll.vue";
import Scroll from "@/components/WrapScroll/WrapScroll";
import { useRouter } from "vue-router";
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "@/store/index";
import { ISingerDetailsInfo } from "@/types/index";

interface IPos {
  x: number;
  y: number;
}

interface ISongListSelectItemParams {
  song: ISingerDetailsInfo;
  index: number;
}

const HEADER_HEIGHT = 40;

interface IProps {
  songs?: any[];
  title?: string;
  pic?: string;
  loading?: boolean;
  isShowNoResult?: boolean;
}

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
    noResultText: {
      type: String,
      default: "抱歉，没有歌曲",
    },
    isRank: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: IProps) {
    const router = useRouter();
    const store = useStore();
    const imageHeight = ref(0);
    const bgImage = ref<HTMLElement | null>(null);
    const scrollY = ref(0);
    const maxTranslateY = ref(0); // 最高滚动距离

    const playList = computed(() => store.state.music.playList);
    const bgImageStyle = computed(() => {
      let zIndex = 0;
      let paddingTop: string | number = "70%";
      let height = "0px";
      let translateZ = 0; // 兼容ios
      let scale = 1;
      if (scrollY.value > maxTranslateY.value) {
        zIndex = 10;
        height = `${HEADER_HEIGHT}px`;
        paddingTop = 0;
        translateZ = 1;
      }
      if (scrollY.value < 0) {
        scale = scale + Math.abs(scrollY.value / maxTranslateY.value);
      }

      return {
        zIndex,
        height,
        paddingTop,
        backgroundImage: `url(${props.pic})`,
        transform: `scale(${scale})translateZ(${translateZ}px)`,
      };
    });
    const palyBtnStyle = computed(() => {
      let display = "";
      if (scrollY.value >= maxTranslateY.value) {
        display = "none";
      }
      return {
        display,
      };
    });
    const scrollStyle = computed(() => {
      const bottom = playList.value.length ? "60px" : "0";
      return {
        top: `${imageHeight.value}px`,
        bottom,
      };
    });
    const filterStyle = computed(() => {
      let blur = 0;
      const customizeScrollY = scrollY.value;
      const customizeImageHeight = imageHeight.value;

      if (scrollY.value >= 0) {
        blur =
          Math.min(
            maxTranslateY.value / customizeImageHeight,
            customizeScrollY / customizeImageHeight
          ) * 20;
      }

      return {
        backdropFilter: `blur(${blur}px)`,
      };
    });
    const isShowNoResult = computed(() => {
      return !props.loading && !props.songs?.length;
    });

    onMounted(async () => {
      if (bgImage.value) {
        imageHeight.value = bgImage.value.clientHeight;
      }

      maxTranslateY.value = imageHeight.value - HEADER_HEIGHT;
    });

    const goBack = () => {
      router.back();
    };
    const onScroll = (pos: IPos) => {
      scrollY.value = -pos.y;
    };
    /**
     * 随机播放
     */
    const random = () => {
      store.dispatch("randomPlay", {
        list: props.songs,
      });
    };
    /**
     * 顺序选择播放
     */
    const selectItem = ({ index }: ISongListSelectItemParams): void => {
      store.dispatch("selectPlay", {
        list: props.songs,
        index,
      });
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
      palyBtnStyle,
      filterStyle,
      isShowNoResult,
    };
  },
});
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .icon-play,
  .icon-back {
    color: $color-theme;
    width: 20px;
    height: 20px;
  }
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      padding: 10px;
      box-sizing: content-box;
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
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
