<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:07:46
 * @LastEditTime: 2021-06-16 18:01:50
 * @LastEditors: Please set LastEditors
 * @Description: tab
 * @FilePath: /study_vue03/src/components/tab/index.vue
-->
<template>
  <div class="my-tab">
    <router-link
      v-for="item in tabList"
      :key="item.path"
      :to="item.path"
      class="tab-item"
    >
      <span class="tab-link">
        {{ item.name }}
      </span>
    </router-link>
  </div>
</template>
<script lang="ts">
import { reactive } from "@vue/reactivity";
import { IRouterLink } from "@/types/index";

interface ITab {
  tabList: IRouterLink[];
}

export default {
  name: "myTab",
  setup(): ITab {
    const tabList: IRouterLink[] = reactive([
      {
        name: "推荐",
        path: "/music/recommend",
      },
      {
        name: "歌手",
        path: "/music/singer",
      },
      {
        name: "排行",
        path: "/music/rankingList",
      },
      {
        name: "搜索",
        path: "/music/search",
      },
    ]);

    return {
      tabList,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
