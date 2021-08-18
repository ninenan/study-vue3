<!--
 * @Author: NineNan
 * @Date: 2021-07-04 22:53:28
 * @LastEditTime: 2021-08-18 22:25:16
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
                <base-svg class="icon-clear" icon-class="icon-clear"></base-svg>
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
                  <base-svg
                    class="icon-delete"
                    icon-class="icon-delete"
                  ></base-svg>
                </span>
              </li>
            </transition-group>
          </scroll>
          <div class="list-add">
            <div class="add" @click="showAddSong">
              <i class="icon-add"></i>
              <span class="text">添加歌曲到队列</span>
            </div>
          </div>
          <div class="list-footer" @click.stop="hide">
            <span>关闭</span>
          </div>
        </div>
        <confirm
          ref="confirmRef"
          @confirm="confirmClear"
          text="是否清空播放列表？"
          confirm-btn-text="清空"
        ></confirm>
        <add-song ref="addSongRef" />
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { ref, computed, defineComponent, nextTick, watch } from "vue";
import { useStore } from "@/store";

import { SET_CURRENT_INDEX, SET_PLAYING_STATUE } from "@/helpers/constant";
// components
import Scroll from "@/components/base/scroll/Scroll.vue";
import Confirm from "@/components/base/confirm/Confirm.vue";
import AddSong from "@/components/addSong/AddSong.vue";
// hooks
import useMode from "@/hooks/useMode";
import useFavorites from "@/hooks/useFavorites";

// types
import { ISingerDetailsInfo } from "@/types";

export default defineComponent({
  components: {
    Scroll,
    confirm: Confirm,
    "add-song": AddSong,
  },
  setup() {
    const store = useStore();
    const visible = ref(false);
    const removing = ref(false);
    const scrollRef = ref<HTMLElement | null>(null);
    const listRef = ref<HTMLElement | null>(null);
    const confirmRef = ref<HTMLElement | null>(null);
    const addSongRef = ref<HTMLElement | null>(null);

    const playlist = computed(() => store.state.music.playList);
    const sequenceList = computed(() => store.state.music.sequenceList);
    const currentSong = computed(() => store.getters.currentSong);

    watch(currentSong, async (newCurrentSong) => {
      if (!visible.value || !newCurrentSong.id) {
        return;
      }
      await nextTick();
      scrollToCurrent();
    });

    /**
     * 显示二次确认框
     */
    const showConfirm = () => {
      ((confirmRef.value as HTMLElement) as any).show();
    };
    /**
     * 显示
     */
    const show = async () => {
      visible.value = true;
      await nextTick();
      refreshScroll();
      scrollToCurrent();
    };

    const refreshScroll = () => {
      (scrollRef.value as any).scroll.refresh();
    };

    const scrollToCurrent = () => {
      const index = sequenceList.value.findIndex(
        (item) => currentSong.value.id === item.id
      );

      if (index === -1) {
        return;
      }
      const target = (listRef.value as any).$el.children[index];
      (scrollRef.value as any).scroll.scrollToElement(target, 300);
    };
    /**
     *隐藏
     */
    const hide = () => {
      visible.value = false;
    };
    /**
     * 展示添加歌曲组件
     */
    const showAddSong = () => {
      (addSongRef.value as any).show();
    };
    const getCurrentIcon = (song: ISingerDetailsInfo) => {
      return song.id === currentSong.value.id ? "icon-playing" : "";
    };
    /**
     * 删除歌曲
     */
    const removeSong = (song: ISingerDetailsInfo) => {
      if (removing.value) {
        return;
      }
      removing.value = true;
      store.dispatch("removeSong", song);
      if (!playlist.value.length) {
        hide();
      }
      setTimeout(() => {
        removing.value = false;
      }, 300);
    };
    /**
     * 选择歌曲
     */
    const selectItem = (song: ISingerDetailsInfo) => {
      const index = playlist.value.findIndex((item) => song.id === item.id);

      store.commit(SET_CURRENT_INDEX, index);
      store.commit(SET_PLAYING_STATUE, true);
    };
    /**
     * 清空歌曲
     */
    const confirmClear = () => {
      store.dispatch("clearSongList");
      hide();
    };

    // hooks
    const { modeIcon, modeText, changeMode } = useMode();
    const { getFavoritesIcon, toggleFavorites } = useFavorites();

    return {
      visible,
      playlist,
      sequenceList,
      removing,
      scrollRef,
      listRef,
      confirmRef,
      addSongRef,
      show,
      hide,
      showConfirm,
      showAddSong,
      getCurrentIcon,
      removeSong,
      selectItem,
      confirmClear,
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
    transition: opacity 0.5s;
    .list-wrapper {
      transition: all 0.5s;
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
            width: 20px;
            height: 20px;
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
          .icon-delete {
            width: 20px;
            height: 20px;
          }
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
