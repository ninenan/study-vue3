<!--
 * @Author: NineNan
 * @Date: 2021-05-07 21:47:18
 * @LastEditTime: 2021-05-22 17:47:55
 * @LastEditors: Please set LastEditors
 * @Description: Cat
 * @FilePath: /study_vue03/src/views/Cat.vue
-->
<template>
  <div class="cat">
    <div class="loading" v-if="isShowLoading">loading...</div>
    <img v-else :src="imageSrc" alt="" />
  </div>
</template>
<script lang="ts">
import useURLLoader from "@/hooks/useURLLoader";
import { watch, ref, Ref } from "@vue/runtime-core";

export interface ICatResult {
  breeds: [];
  id: string;
  url: string;
  width: number;
  height: number;
}

interface ICat {
  imageSrc: Ref<string>;
  isShowLoading: Ref<boolean>;
  error: Ref<null>;
}

export default {
  setup(): ICat {
    const { result, isShowLoading, error } = useURLLoader<ICatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1&size=full&sub_id=demo-2b4916"
    );
    const imageSrc = ref("");

    watch(result, () => {
      if (result.value) {
        imageSrc.value = result.value[0].url;
      }
    });

    return {
      imageSrc,
      isShowLoading,
      error,
    };
  },
};
</script>
<style lang="scss" scoped>
.cat {
  @include FlexCenter();
  flex-direction: column;
}
.loading {
  color: black;
  font-size: 14px;
}
img {
  width: 200px;
  height: 200px;
}
</style>
