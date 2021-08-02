<!--
 * @Author: NineNan
 * @Date: 2021-05-17 23:00:01
 * @LastEditTime: 2021-08-02 23:35:38
 * @LastEditors: Please set LastEditors
 * @Description: search
 * @FilePath: /study_vue03/src/views/search/index.vue
-->
<template>
  <main class="search">
    <article class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </article>
    <article class="search-content">
      <section class="hot-keys">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li
            v-for="item in hotKeys"
            :key="item.id"
            class="item"
            @click="addQuery(item.key)"
          >
            {{ item.key }}
          </li>
        </ul>
      </section>
    </article>
  </main>
</template>
<script lang="ts">
// components
import SearchInput from "@/components/search/SearchInput.vue";
// api
import { getHotKeys } from "@/api/search";
import { Ref, ref } from "vue";
// types
import { IHotKey } from "@/types/index";
export interface ISearch {
  query: Ref<string>;
  hotKeys: Ref<IHotKey[]>;
  addQuery: (key: string) => void;
}

export default {
  name: "search",
  components: {
    "search-input": SearchInput,
  },
  setup(): ISearch {
    const query = ref("test");
    const hotKeys = ref<IHotKey[]>([]);

    getHotKeys<{ hotKeys: IHotKey[] }>().then((res) => {
      hotKeys.value = res.hotKeys;
    });

    const addQuery = (key: string) => {
      query.value = key;
    };

    return {
      query,
      hotKeys,
      addQuery,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
