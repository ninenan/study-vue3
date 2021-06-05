<!--
 * @Author: NineNan
 * @Date: 2021-06-05 22:54:53
 * @LastEditTime: 2021-06-05 23:16:06
 * @LastEditors: Please set LastEditors
 * @Description: BaseNoResult
 * @FilePath: /study_vue03/src/components/base/BaseNoResult/BaseNoResult.vue
-->
<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="icon"></div>
      <p class="text">{{ title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "no-result",
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
    text-align: center;
    .icon {
      width: 86px;
      height: 90px;
      margin: 0 auto;
      border-radius: 50%;
      background-image: url("https://yw-dev-bucket.eos-ningbo-1.cmecloud.cn/f9ef65e9-6111-4162-9171-2af67398bed0.jpg");
      background-size: 86px 90px;
    }
    .text {
      margin-top: 30px;
      font-size: $font-size-medium;
      color: $color-text-d;
    }
  }
}
</style>
