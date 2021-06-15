<!--
 * @Author: NineNan
 * @Date: 2021-06-05 22:54:53
 * @LastEditTime: 2021-06-06 01:07:45
 * @LastEditors: Please set LastEditors
 * @Description: BaseNoResult
 * @FilePath: /study_vue03/src/components/base/BaseNoResult/BaseNoResult.vue
-->
<template>
  <div class="no-result">
    <div class="no-result-content">
      <BaseSvg iconClass="icon-no-result" class="icon-no-result" />
      <p class="text">{{ title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import BaseSvg from "@/components/base/BaseSvg/BaseSvg.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "no-result",
  components: {
    BaseSvg,
  },
  setup() {
    const title = ref("抱歉，没有结果");
    const setTitle = (newTitle: string): void => {
      title.value = newTitle;
    };

    return {
      title,
      setTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .no-result-content {
    @include FlexCenter();
    flex-direction: column;
    height: 300px;
    width: 100%;
    .icon-no-result {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      color: $color-text-d;
    }
    .text {
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
}
</style>
