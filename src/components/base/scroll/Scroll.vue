<!--
 * @Author: NineNan
 * @Date: 2021-05-23 14:09:30
 * @LastEditTime: 2021-05-23 14:52:14
 * @LastEditors: Please set LastEditors
 * @Description: Scroll
 * @FilePath: /study_vue03/src/components/base/scroll/Scroll.vue
-->
<template>
  <div ref="scrollRef">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useScroll } from "@/hooks/useScroll";

export default defineComponent({
  name: "scroll",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const scrollRef = ref(null);
    const scroll = useScroll(scrollRef, props);

    return {
      scrollRef,
      scroll,
    };
  },
});
</script>
