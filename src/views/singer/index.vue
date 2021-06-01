<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:57:28
 * @LastEditors: Please set LastEditors
 * @Description: Singer
 * @FilePath: /study_vue03/src/views/singer/index.vue
 * @LastEditTime: 2021-06-01 14:35:21
-->
<template>
  <div class="singer" v-loading="loading">
    <SingerList :singers-list="singers" />
    <router-view />
  </div>
</template>
<script lang="ts">
import { getSingerList } from "@/api/singer";
import { ISingerList } from "@/types";
import { ref, Ref, computed, ComputedRef } from "vue";
import SingerList from "@/components/singer/SingerList.vue";

interface ISinger {
  singers: Ref<ISingerList[]>;
  loading: ComputedRef<boolean>;
}

export default {
  name: "singer",
  components: {
    SingerList,
  },
  setup(): ISinger {
    const singers = ref<ISingerList[]>([]);

    const loading = computed(() => {
      return singers.value.length <= 0;
    });

    getSingerList<{ singers: ISingerList[] }>().then((res) => {
      singers.value = res.singers;
    });

    return {
      singers,
      loading,
    };
  },
};
</script>
<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 44px;
  width: 100%;
  height: 100%;
}
</style>
