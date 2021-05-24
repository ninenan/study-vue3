<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:57:28
 * @LastEditTime: 2021-05-24 23:50:32
 * @LastEditors: Please set LastEditors
 * @Description: Singer
 * @FilePath: /study_vue03/src/views/singer/index.vue
-->
<template>
  <div class="singer">
    <SingerList :singers-list="singers" />
  </div>
</template>
<script lang="ts">
import { getSingerList } from "@/api/singer";
import { ISingerList } from "@/types";
import { ref, Ref } from "vue";
import SingerList from "@/components/singer/SingerList.vue";

interface ISinger {
  singers: Ref<ISingerList[]>;
}

export default {
  name: "singer",
  components: {
    SingerList,
  },
  setup(): ISinger {
    const singers = ref<ISingerList[]>([]);
    getSingerList<{ singers: ISingerList[] }>().then((res) => {
      singers.value = res.singers;
    });

    return {
      singers,
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
