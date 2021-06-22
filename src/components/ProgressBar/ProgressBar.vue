<!--
 * @Author: NineNan
 * @Date: 2021-06-22 14:32:23
 * @LastEditTime: 2021-06-22 15:12:39
 * @LastEditors: Please set LastEditors
 * @Description: ProgressBar
 * @FilePath: \study-vue3\src\components\ProgressBar\ProgressBar.vue
-->
<template>
  <div class="progress-bar" ref="progressBarRef">
    <div class="bar-inner">
      <div class="progress" ref="progress" :style="progressStyle"></div>
      <div class="progress-btn-wrapper" :style="btnStyle">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

const progressBtnWidth = 16;
export default defineComponent({
  name: "progress-bar",
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const offset = ref(0);
    const progressBarRef = ref<HTMLElement | null>(null);

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

    return {
      progressStyle,
      btnStyle,
      progressBarRef,
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
