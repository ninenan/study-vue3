<!--
 * @Author: NineNan
 * @Date: 2021-05-11 21:21:49
 * @LastEditTime: 2021-06-28 10:24:15
 * @LastEditors: Please set LastEditors
 * @Description: study vuex
 * @FilePath: /study_vue03/src/views/StudyVuex.vue
-->
<template>
  <div class="study-vuex">
    <h1>Study Vuex</h1>
    <p>count: {{ count }}</p>
    <p>isGreaterTen: {{ isGreaterTen }}</p>
    <div class="mb-20">
      <button @click.prevent="addCount" type="primary">addCount</button>
    </div>
    <div class="mb-20">
      <button @click.prevent="asyncAddCount" type="primary">
        asyncAddCount
      </button>
    </div>
    <div>
      <button @click="goModules" type="primary">goModules</button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ComputedRef } from "vue";
import { ADD_COUNT } from "@/helpers/constant";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";

interface IStudyVuex {
  count: ComputedRef<number>;
  addCount: () => void;
  isGreaterTen: ComputedRef<boolean>;
  asyncAddCount: () => void;
  goModules: () => void;
}

export default {
  setup(): IStudyVuex {
    const router = useRouter();
    const store = useStore();

    const count = computed(() => {
      return store.state.test.count;
    });

    const isGreaterTen = computed(() => {
      return store.getters.isGreaterTen;
    });

    const addCount = () => {
      store.commit(ADD_COUNT, 10);
    };

    const asyncAddCount = () => {
      setTimeout(() => {
        store.dispatch("addCount", 0);
      }, 1000);
    };

    const goModules = () => {
      router.push({
        name: "studyVuexModules",
        params: {
          id: 11,
          userName: "NNN",
        },
      });
    };

    return {
      count,
      addCount,
      isGreaterTen,
      asyncAddCount,
      goModules,
    };
  },
};
</script>
<style lang="scss" scoped>
h1 {
  color: $themeColor;
}
.study-vuex {
  @include FlexCenter();
  flex-direction: column;
}
</style>
