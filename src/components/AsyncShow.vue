<!--
 * @Author: NineNan
 * @Date: 2021-05-08 14:16:32
 * @LastEditTime: 2021-06-28 10:33:06
 * @LastEditors: Please set LastEditors
 * @Description: AsyncShow
 * @FilePath: \study-vue3\src\components\AsyncShow.vue
-->
<template>
  <div class="async-show">async-show</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          result: 42,
        });
      }, 3000);
    });
  },
});
</script>
<style lang="scss" scoped>
div {
  color: $color-theme;
}
</style>
