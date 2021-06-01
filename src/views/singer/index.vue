<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:57:28
 * @LastEditors: Please set LastEditors
 * @Description: Singer
 * @FilePath: /study_vue03/src/views/singer/index.vue
 * @LastEditTime: 2021-06-01 22:50:01
-->
<template>
  <div class="singer" v-loading="loading">
    <SingerList :singers-list="singers" @select="selectSinger" />
    <router-view :singer="selectedSinger" />
  </div>
</template>
<script lang="ts">
import { getSingerList } from "@/api/singer";
import { ISingerList, ISingerInfo } from "@/types";
import { ref, Ref, computed, ComputedRef, reactive, toRefs, toRef } from "vue";
import { useRouter } from "vue-router";
import SingerList from "@/components/singer/SingerList.vue";

// interface ISinger {
//   singers: Ref<ISingerList[]>;
//   loading: ComputedRef<boolean>;
//   selectSinger: (singer: ISingerInfo) => void;
// }

export default {
  name: "singer",
  components: {
    SingerList,
  },
  setup() {
    const router = useRouter();
    const singers = ref<ISingerList[]>([]);
    let selectedSinger = ref<ISingerInfo | null>(null);

    const loading = computed(() => {
      return singers.value.length <= 0;
    });
    const selectSinger = (singer: ISingerInfo) => {
      selectedSinger.value = singer;
      // selectedSinger.singer = singer;
      router.push({
        name: `SingerDetails`,
        params: {
          mid: singer.mid,
        },
      });
    };

    getSingerList<{ singers: ISingerList[] }>().then((res) => {
      singers.value = res.singers;
    });

    return {
      singers,
      loading,
      selectSinger,
      selectedSinger,
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
