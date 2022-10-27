<!--
 * @Author: NineNan
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-06-10 23:28:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\App.vue
-->
<template>
  <Tab />
  <Suspense>
    <router-view />
  </Suspense>
</template>
<script lang="ts">
import Tab from "@components/tab/index.vue";
export default {
  components: {
    Tab,
  },
};
</script>
