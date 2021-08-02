<!--
 * @Author: NineNan
 * @Date: 2021-08-02 22:11:30
 * @LastEditTime: 2021-08-02 23:03:04
 * @LastEditors: Please set LastEditors
 * @Description: SearchInput
 * @FilePath: /study_vue03/src/components/search/SearchInput.vue
-->
<template>
  <article class="search-input">
    <base-svg icon-class="icon-search" class="icon-search"></base-svg>
    <input
      class="input-inner"
      v-model.trim="query"
      :placeholder="placeholder"
    />
    <base-svg
      v-show="query"
      icon-class="icon-search-clear"
      class="icon-search-clear"
      @click="clear"
    ></base-svg>
  </article>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";

export default defineComponent({
  name: "SearchInput",
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props: { placeholder: string; modelValue: string }, { emit }) {
    const query = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newModelVal) => {
        query.value = newModelVal;
      }
    );

    watch(query, (newQuery) => {
      emit("update:modeValue", newQuery);
    });

    const clear = () => {
      query.value = "";
    };

    return {
      query,
      clear,
    };
  },
});
</script>
<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;
  .icon-search {
    width: 16px;
    height: 16px;
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-search-clear {
    width: 16px;
    height: 16px;
    color: $color-text-d;
  }
}
</style>
