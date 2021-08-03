<!--
 * @Author: NineNan
 * @Date: 2021-05-17 23:00:01
 * @LastEditTime: 2021-08-03 22:53:25
 * @LastEditors: Please set LastEditors
 * @Description: search
 * @FilePath: /study_vue03/src/views/search/index.vue
-->
<template>
  <main class="search">
    <article class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </article>
    <article class="search-content" v-show="!query">
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
    <article class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </article>
  </main>
</template>
<script lang="ts">
// components
import SearchInput from "@/components/search/SearchInput.vue";
import Suggest from "@/components/search/Suggest.vue";
// api
import { getHotKeys } from "@/api/search";
import { Ref, ref, watch } from "vue";
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
    suggest: Suggest,
  },
  setup(): ISearch {
    const query = ref("");
    const hotKeys = ref<IHotKey[]>([]);

    watch(query, (newQuery) => {
      console.log("newQuery :>> ", newQuery);
    });

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
