<!--
 * @Author: NineNan
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-05-23 13:35:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\App.vue
-->
<template>
  <Tab />
  <router-view />
</template>
<script lang="ts">
import Tab from "@components/tab/index.vue";

export default {
  components: {
    Tab,
  },
};
</script>
