<!--
 * @Author: your name
 * @Date: 2021-06-29 14:47:23
 * @LastEditTime: 2021-06-29 15:14:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\components\Player\ProgressCircle.vue
-->
<template>
  <div class="progress-circle">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress-background"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
      />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";

export default defineComponent({
  name: "progressCircle",
  props: {
    radius: {
      type: Number,
      default: 100,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const dashArray = ref(Math.PI * 100);
    const dashOffset = computed(() => (1 - props.progress) * dashArray.value);

    return {
      dashOffset,
      dashArray,
    };
  },
});
</script>

<style lang="scss" scoped>
.progress-circle {
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: $color-theme-d;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>
