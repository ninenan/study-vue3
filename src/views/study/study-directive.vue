<!--
 * @Author: NineNan
 * @Date: 2021-05-31 13:52:07
 * @LastEditTime: 2021-05-31 20:58:12
 * @LastEditors: Please set LastEditors
 * @Description: Study Directive
 * @FilePath: \study-vue3\src\views\study\StudyDirective.vue
-->
<template>
  <div class="study-directive">
    <h1>Study Directive</h1>
    <p v-money-format>{{ myNumber }}</p>
  </div>
</template>
<script lang="ts">
import { ref, Ref } from "vue";

interface IMyNumber {
  myNumber: Ref<number>;
}

export default {
  setup(): IMyNumber {
    const myNumber = ref(0);

    setTimeout(() => {
      myNumber.value = -123123123123.32112312;
    }, 1000);

    return {
      myNumber,
    };
  },
};
</script>
<style lang="scss" scoped></style>
