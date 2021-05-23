<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:56:26
 * @LastEditTime: 2021-05-23 15:22:14
 * @LastEditors: Please set LastEditors
 * @Description: Recommend
 * @FilePath: /study_vue03/src/views/recommend/index.vue
-->
<template>
  <div class="recommend">
    <Scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliders.length" :sliders="sliders" />
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in albums" :key="item.id">
              <div class="icon">
                <img v-lazy="item.pic" width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name mb-10">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script lang="ts">
import { getRecommend } from "@/api/recommend";
import { IRecommend, IRecommendSliders, IRecommendAlbums } from "@/types/index";
import Slider from "@/components/base/slider/index.vue";
import { Ref, ref } from "vue";
import Scroll from "@/components/base/scroll/Scroll.vue";

interface IRecommendVue {
  sliders: Ref<IRecommendSliders[]>;
  albums: Ref<IRecommendAlbums[]>;
}

export default {
  components: {
    Slider,
    Scroll,
  },

  setup(): IRecommendVue {
    const sliders = ref<IRecommendSliders[]>([]);
    const albums = ref<IRecommendAlbums[]>([]);

    getRecommend<IRecommend>().then((res) => {
      albums.value = res.albums;
      sliders.value = res.sliders;
    });

    return {
      sliders,
      albums,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
