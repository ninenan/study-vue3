<!--
 * @Author: NineNan
 * @Date: 2021-08-17 23:27:29
 * @LastEditTime: 2021-08-17 23:42:39
 * @LastEditors: Please set LastEditors
 * @Description: 搜索历史
 * @FilePath: /study_vue03/src/components/search/SearchHistory.vue
-->
<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li
        v-for="item in searches"
        :key="item"
        class="search-item"
        @click="selectItem(item)"
      >
        <span class="text">{{ item }}</span>
        <span v-if="showDelete" class="icon" @click.stop="deleteItem(item)">
          <base-svg icon-class="icon-delete"></base-svg>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "search-history-list",
  props: {
    searches: {
      type: Array,
      default() {
        return [];
      },
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["select", "delete"],
  setup() {
    function selectItem(item) {
      this.$emit("select", item);
    }
    function deleteItem(item) {
      this.$emit("delete", item);
    }

    return {
      selectItem,
      deleteItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
    .text {
      flex: 1;
      color: $color-text-l;
    }
    .icon {
      @include extend-click();
      color: $color-text-d;
    }
  }
}
</style>
