<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:57:28
 * @LastEditTime: 2021-05-26 11:22:52
 * @LastEditors: Please set LastEditors
 * @Description: Singer
 * @FilePath: /study_vue03/src/views/singer/index.vue
-->
<template>
  <div class="singer" v-loading="loading">
    <SingerList :singers-list="singers" />
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
