<!--
 * @Author: NineNan
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-05-22 23:19:52
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
<style lang="scss">
#nav {
  padding: 30px;
  @include FlexCenter();
}

#nav a {
  font-weight: bold;
  color: $color-text;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
