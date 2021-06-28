<!--
 * @Author: NineNan
 * @Date: 2021-05-08 14:08:03
 * @LastEditTime: 2021-06-28 14:06:58
 * @LastEditors: Please set LastEditors
 * @Description: study Suspense 如果是异步组件的话 外层需要使用 Suspense
 * @FilePath: \study-vue3\src\views\Suspense.vue
-->
<template>
  <div>
    <h1>study Suspense</h1>
    <Suspense>
      <template #default>
        <!-- <async-show /> -->
        <dog-show />
      </template>
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent } from "vue";
// const AsyncShow = defineAsyncComponent(
//   () => import("@/components/AsyncShow.vue")
// );
const DogShow = defineAsyncComponent(() => import("@/components/DogShow.vue"));
export default {
  components: {
    // "async-show": AsyncShow,
    "dog-show": DogShow,
  },
};
</script>
