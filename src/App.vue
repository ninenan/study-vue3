<!--
 * @Author: NineNan
 * @Date: 2021-05-08 09:38:21
 * @LastEditTime: 2021-05-12 11:22:24
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
import { ref, Ref } from "vue";
import { IRouterLink } from "@/types/index.ts";

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
      {
        name: "Suspense",
        path: "/suspense",
      },
      {
        name: "StudyWatch",
        path: "/studyWatch",
      },
      {
        name: "Dropdown",
        path: "/dropdown",
      },
      {
        name: "StudyValidate",
        path: "/studyValidate",
      },
      {
        name: "StudyVuex",
        path: "/studyVuex",
      },
      {
        name: "StudyVuexModules",
        path: "/studyVuexModules",
      },
    ]);

    return {
      routerLinkList,
    };
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  @include FlexCenter();
  flex-direction: column;
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
