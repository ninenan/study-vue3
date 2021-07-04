<!--
 * @Author: NineNan
 * @Date: 2021-07-04 22:53:28
 * @LastEditTime: 2021-07-04 23:49:47
 * @LastEditors: Please set LastEditors
 * @Description: Playlist
 * @FilePath: /study_vue03/src/components/Player/Playlist.vue
-->
<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="visible && playlist.length" @click="hide">
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <base-svg class="icon" :icon-class="modeIcon" @click="changeMode">
              </base-svg>
              <span class="text">{{ modeText }}</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
          </div>
          <scroll ref="scrollRef" class="list-content">
            <transition-group ref="listRef" name="list" tag="ul">
              <li
                class="item"
                v-for="song in sequenceList"
                :key="song.id"
                @click="selectItem(song)"
              >
                <base-svg
                  class="current"
                  :icon-class="getCurrentIcon(song)"
                ></base-svg>
                <span class="text">{{ song.name }}</span>
                <span class="favorite" @click.stop="toggleFavorites(song)">
                  <base-svg
                    class="icon-favorite"
                    :icon-class="getFavoritesIcon(song)"
                  ></base-svg>
                </span>
                <span
                  class="delete"
                  @click.stop="removeSong(song)"
                  :class="{ disable: removing }"
                >
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <!-- <div class="list-add">
            <div class="add" @click="showAddSong">
              <i class="icon-add"></i>
              <span class="text">添加歌曲到队列</span>
            </div>
          </div> -->
          <div class="list-footer" @click.stop="hide">
            <span>关闭</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { useStore } from "@/store";

import { SET_CURRENT_INDEX, SET_PLAYING_STATUE } from "@/helpers/constant";
// components
import Scroll from "@/components/base/scroll/Scroll.vue";

// hooks
import useMode from "@/hooks/useMode";
import useFavorites from "@/hooks/useFavorites";

// types
import { ISingerDetailsInfo } from "@/types";

export default defineComponent({
  components: {
    Scroll,
  },
  setup() {
    const store = useStore();
    const visible = ref(false);
    const removing = ref(false);
    const playlist = computed(() => store.state.music.playList);
    const sequenceList = computed(() => store.state.music.sequenceList);
    const currentSong = computed(() => store.getters.currentSong);

    const showConfirm = () => {
      //
    };

    /**
     * 显示
     */
    const show = () => {
      visible.value = true;
    };
    /**
     *隐藏
     */
    const hide = () => {
      visible.value = false;
    };
    const showAddSong = () => {
      //
    };
    const getCurrentIcon = (song: ISingerDetailsInfo) => {
      if (song.id === currentSong.value.id) {
        return "icon-playing";
      } else {
        return " ";
      }
    };
    const removeSong = (song: ISingerDetailsInfo) => {
      //
      console.log(song);
    };
    /**
     * 选择歌曲
     */
    const selectItem = (song: ISingerDetailsInfo) => {
      const index = playlist.value.findIndex((item) => song.id === item.id);

      store.commit(SET_CURRENT_INDEX, index);
      store.commit(SET_PLAYING_STATUE, true);
    };

    // hooks
    const { modeIcon, modeText, changeMode } = useMode();
    const { getFavoritesIcon, toggleFavorites } = useFavorites();

    return {
      visible,
      playlist,
      sequenceList,
      removing,
      show,
      hide,
      showConfirm,
      showAddSong,
      getCurrentIcon,
      removeSong,
      selectItem,
      // useMode
      modeIcon,
      modeText,
      changeMode,
      // useFavorites
      getFavoritesIcon,
      toggleFavorites,
    };
  },
});
</script>
<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
    background-color: $color-highlight-background;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
          width: 24px;
          height: 24px;
          color: $color-theme;
        }
        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme;
          margin-right: 5px;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }
        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;
          .icon-favorite {
            width: 20px;
            height: 20px;
            // color: $color-sub-theme;
          }
        }
        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
        }
      }
    }
    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;
        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .list-footer {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>
