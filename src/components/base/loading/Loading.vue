<!--
 * @Author: NineNan
 * @Date: 2021-05-23 19:21:32
 * @LastEditTime: 2021-05-23 20:41:12
 * @LastEditors: Please set LastEditors
 * @Description: Loading
 * @FilePath: /study_vue03/src/components/base/loading/Loading.vue
-->
<template>
  <div class="loading">
    <div class="loading-content">
      <img :src="loadingImg" alt="" width="24" height="24" />
      <p class="title">{{ loadingTitle }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const loadingImg = require("@/assets/img/loading.gif");
    const loadingTitle = ref("loading...");
    const setTitle = (title: string) => {
      loadingTitle.value = title;
    };

    return {
      loadingImg,
      setTitle,
      loadingTitle,
    };
  },
});
</script>
<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    .title {
      font-size: $font-size-small;
      color: $color-text-l;
      line-height: 20px;
    }
  }
}
</style>
