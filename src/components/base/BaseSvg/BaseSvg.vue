<!--
 * @Author: NineNan
 * @Date: 2021-06-02 16:34:33
 * @LastEditTime: 2021-08-03 23:07:38
 * @LastEditors: Please set LastEditors
 * @Description: BaseSvg
 * @FilePath: \study-vue3\src\components\base\mySvg\BaseSvg.vue
-->
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`;
    });

    return {
      iconName,
    };
  },
});
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
