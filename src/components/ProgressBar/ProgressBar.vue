<!--
 * @Author: NineNan
 * @Date: 2021-06-22 14:32:23
 * @LastEditTime: 2021-06-29 16:05:43
 * @LastEditors: Please set LastEditors
 * @Description: ProgressBar
 * @FilePath: \study-vue3\src\components\ProgressBar\ProgressBar.vue
-->
<template>
  <div class="progress-bar" ref="progressBarRef" @click="onClick">
    <div class="bar-inner">
      <div class="progress" ref="progressRef" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from "vue";

const progressBtnWidth = 16;

interface ITouch {
  x: number;
  beginWidth: number;
}

export interface IProgressBar {
  progressStyle: Ref<string>;
  btnStyle: Ref<string>;
  progressBarRef: Ref<HTMLElement | null>;
  progressRef: Ref<HTMLElement | null>;
  onTouchStart: (event: TouchEvent) => void;
  onTouchMove: (event: TouchEvent) => void;
  onTouchEnd: () => void;
  onClick: (event: MouseEvent) => void;
  setOffset: (progress: number) => void;
}

export default defineComponent({
  name: "progress-bar",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  emits: ["progress-changing", "progress-changed"],

  setup(props, { emit }): IProgressBar {
    const offset = ref(0);
    const progressBarRef = ref<HTMLElement | null>(null);
    const progressRef = ref<HTMLElement | null>(null);
    const touch: ITouch = {
      x: 0,
      beginWidth: 0,
    };

    const progressStyle = computed(() => `width: ${offset.value}px`);
    const btnStyle = computed(
      () => `transform: translate3d(${offset.value}px, 0, 0)`
    );

    watch(
      () => props.progress,
      (newProgress) => {
        setOffset(newProgress);
      }
    );

    const setOffset = (progress: number): void => {
      const progressBarRefVal = progressBarRef.value;
      if (progressBarRefVal) {
        const barWidth = progressBarRefVal.clientWidth - progressBtnWidth;
        offset.value = barWidth * progress;
      }
    };
    /**
     * 开始触屏
     */
    const onTouchStart = (event: TouchEvent) => {
      const progressRefValue = progressRef.value;

      touch.x = event.touches[0].pageX;
      if (progressRefValue) {
        touch.beginWidth = progressRefValue.clientWidth;
      }
    };
    /**
     * 触屏中移动
     */
    const onTouchMove = (event: TouchEvent) => {
      const progressBarRefVal = progressBarRef.value;
      const distance = event.touches[0].pageX - touch.x;
      const tempWidth = touch.beginWidth + distance; // 进度条位移之后的宽度

      if (progressBarRefVal) {
        const barWidth = progressBarRefVal.clientWidth - progressBtnWidth;
        const progress = Math.min(1, Math.max(tempWidth / barWidth, 0));
        offset.value = barWidth * progress;
        emit("progress-changing", progress);
      }
    };
    /**
     * 触屏结束
     */
    const onTouchEnd = () => {
      const progressBarRefVal = progressBarRef.value;
      const progressRefValue = progressRef.value;

      if (progressBarRefVal && progressRefValue) {
        const barWidth = progressBarRefVal.clientWidth - progressBtnWidth;
        const progress = progressRefValue.clientWidth / barWidth;
        emit("progress-changed", progress);
      }
    };
    /**
     * 点击进度条
     */
    const onClick = (event: MouseEvent) => {
      const progressBarRefValue = progressBarRef.value;
      if (progressBarRefValue) {
        const rect = progressBarRefValue.getBoundingClientRect();
        const offsetWidth = event.pageX - rect?.left;
        const barWidth = progressBarRefValue.clientWidth - progressBtnWidth;
        const progress = offsetWidth / barWidth;
        emit("progress-changed", progress);
      }
    };

    return {
      progressStyle,
      btnStyle,
      progressBarRef,
      progressRef,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onClick,
      setOffset,
    };
  },
});
</script>
<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
