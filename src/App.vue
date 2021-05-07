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
import { ref } from "vue";
interface IRouterLink {
  name: string;
  path: string;
}

export default {
  setup() {
    const routerLinkList: IRouterLink[] = [
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
    ];

    return {
      routerLinkList: ref(routerLinkList),
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
