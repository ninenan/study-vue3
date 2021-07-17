<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:57:28
 * @LastEditors: Please set LastEditors
 * @Description: Singer
 * @FilePath: /study_vue03/src/views/singer/index.vue
 * @LastEditTime: 2021-07-17 23:16:02
-->
<template>
  <div class="singer" v-loading="loading">
    <SingerList :singers-list="singers" @select="selectSinger" />
    <Suspense>
      <template #default>
        <router-view v-slot="{ Component }">
          <transition appear name="slide">
            <component :is="Component" :singer="selectedSinger" />
          </transition>
        </router-view>
      </template>
    </Suspense>
  </div>
</template>
<script lang="ts">
import { getSingerList } from "@/api/singer";
import { ISingerList, ISingerInfo } from "@/types";
import { ref, Ref, computed, ComputedRef } from "vue";
import { useRouter } from "vue-router";
import SingerList from "@/components/singer/SingerList.vue";
import { useStore } from "@/store/index";
import { CACHE_SINGER_INFO } from "@/helpers/constant";

interface ISinger {
  singers: Ref<ISingerList[]>;
  loading: ComputedRef<boolean>;
  selectSinger: (singer: ISingerInfo) => void;
  selectedSinger: Ref<ISingerInfo | null>;
}

export default {
  name: "singer",
  components: {
    SingerList,
  },
  setup(): ISinger {
    const router = useRouter();
    const store = useStore();
    const singers = ref<ISingerList[]>([]);
    let selectedSinger = ref<ISingerInfo | null>(null);

    const loading = computed(() => {
      return singers.value.length <= 0;
    });
    const selectSinger = (singer: ISingerInfo) => {
      selectedSinger.value = singer;
      store.commit(CACHE_SINGER_INFO, singer);
      router.push({
        name: "SingerDetails",
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
}
</style>
