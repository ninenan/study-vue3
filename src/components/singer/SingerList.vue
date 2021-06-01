<!--
 * @Author: NineNan
 * @Date: 2021-05-24 22:01:15
 * @LastEditTime: 2021-06-01 14:47:06
 * @LastEditors: Please set LastEditors
 * @Description: SingerList
 * @FilePath: /study_vue03/src/components/singer/SingerList.vue
-->
<template>
  <Scroll class="singer-list" :probeType="3" @scroll="onScroll" ref="scrollRef">
    <ul ref="groupRef">
      <li v-for="group in singersList" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            class="item"
            @click="onItemClick(item)"
          >
            <img class="avatar" v-lazy="item.pic" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-show="fixedTitle" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
          class="item"
          :class="{ current: currentIndex === index }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </Scroll>
</template>
<script lang="ts">
import Scroll from "@/components/base/scroll/Scroll.vue";
import { useRouter } from "vue-router";
import { ISingerList, ISingerInfo } from "@/types";
import { defineComponent, PropType } from "vue";
import useFixed from "@/hooks/useFixed";
import useShortcut from "@/hooks/useShortcut";

export default defineComponent({
  name: "singerList",
  components: {
    Scroll,
  },
  props: {
    singersList: Array as PropType<ISingerList[]>,
  },
  setup(props) {
    const router = useRouter();
    const {
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      currentIndex,
    } = useFixed(props);
    const {
      shortcutList,
      onShortcutTouchStart,
      scrollRef,
      onShortcutTouchMove,
    } = useShortcut(props, groupRef);

    const onItemClick = (item: ISingerInfo) => {
      router.push({
        name: `SingerDetails`,
        params: {
          mid: item.mid,
        },
      });
    };

    return {
      // useFixed
      groupRef,
      onScroll,
      fixedTitle,
      fixedStyle,
      currentIndex,
      // useShortcut
      shortcutList,
      onShortcutTouchStart,
      scrollRef,
      onShortcutTouchMove,
      // current component
      onItemClick,
    };
  },
});
</script>
<style lang="scss" scoped>
.singer-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-theme;
      background: $color-highlight-background;
    }
  }
  .shortcut {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>
