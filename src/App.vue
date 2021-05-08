<!--
 * @Author: your name
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-05-08 13:36:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \study-vue3\src\App.vue
-->
<template>
  <div id="nav">
    <router-link
      :to="item.path"
      v-for="(item, index) in routerLinkList"
      :key="item"
    >
      <a-divider type="vertical" v-if="index" />
      {{ item.name }}</router-link
    >
  </div>
  <router-view />
</template>
<script lang="ts">
// 52
import { ref, Ref } from "vue";

interface IRouterLink {
  name: string;
  path: string;
}

interface IRouterListListObj {
  routerLinkList: Ref<IRouterLink[]>;
}

export default {
  setup(): IRouterListListObj {
    const routerLinkList: Ref<IRouterLink[]> = ref([
      {
        name: "Home",
        path: "/",
      },
      {
        name: "About",
        path: "/about",
      },
      {
        name: "Cat",
        path: "/cat",
      },
      {
        name: "Modal",
        path: "/modal",
      },
    ]);

    return {
      routerLinkList,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
