<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:56:26
 * @LastEditTime: 2021-05-22 23:38:36
 * @LastEditors: Please set LastEditors
 * @Description: Recommend
 * @FilePath: /study_vue03/src/views/recommend/index.vue
-->
<template>
  <div>
    <div class="slider-wrapper">
      <div class="slider-content">
        <Suspense>
          <Slider v-if="sliders.length" :sliders="sliders" />
        </Suspense>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getRecommend } from "@/api/recommend";
import { IRecommend, IRecommendSliders } from "@/types/index";
import Slider from "@/components/base/slider/index.vue";
import { Ref, ref } from "vue";

interface IRecommendVue {
  sliders: Ref<IRecommendSliders[]>;
}

export default {
  components: {
    Slider,
  },

  setup(): IRecommendVue {
    const sliders = ref<IRecommendSliders[]>([]);
    getRecommend<IRecommend>().then((res) => {
      sliders.value = res.sliders;
    });

    return {
      sliders,
    };
  },
};
</script>
<style lang="scss" scoped>
.slider-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 40%;
  overflow: hidden;
  .slider-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
