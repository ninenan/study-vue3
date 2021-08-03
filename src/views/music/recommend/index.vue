<!--
 * @Author: NineNan
 * @Date: 2021-05-17 22:56:26
 * @LastEditTime: 2021-08-03 21:59:25
 * @LastEditors: Please set LastEditors
 * @Description: Recommend
 * @FilePath: /study_vue03/src/views/recommend/index.vue
-->
<template>
  <div class="recommend">
    <Scroll class="recommend-content" v-loading:[loadingTitle]="isShowLoading">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliders.length" :sliders="sliders" />
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!isShowLoading">热门歌单推荐</h1>
          <ul>
            <li
              class="item"
              v-for="item in albums"
              :key="item.id"
              @click="selectItem(item)"
            >
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
    <Suspense>
      <template #default>
        <router-view v-slot="{ Component }">
          <transition appear name="slide">
            <component :is="Component" :singer="selectedAlbum" />
          </transition>
        </router-view>
      </template>
    </Suspense>
  </div>
</template>
<script lang="ts">
import { getRecommend } from "@/api/recommend";
import { IRecommend, IRecommendSliders, IRecommendAlbums } from "@/types/index";
import Slider from "@/components/base/slider/index.vue";
import { Ref, ref, computed, ComputedRef } from "vue";
import Scroll from "@/components/base/scroll/Scroll.vue";
import router from "@/router";
import { CACHE_ALBUM_INFO } from "@/helpers/constant";
import { useStore } from "@/store";

interface IRecommendVue {
  sliders: Ref<IRecommendSliders[]>;
  albums: Ref<IRecommendAlbums[]>;
  isShowLoading: ComputedRef<boolean>;
  loadingTitle: Ref<string>;
  selectedAlbum: Ref<IRecommendAlbums | null>;
  selectItem: (item: IRecommendAlbums) => void;
}

export default {
  name: "recommend",
  components: {
    Slider,
    Scroll,
  },

  setup(): IRecommendVue {
    const sliders = ref<IRecommendSliders[]>([]);
    const albums = ref<IRecommendAlbums[]>([]);
    const loadingTitle = ref("加载中...");
    const selectedAlbum = ref<IRecommendAlbums | null>(null);
    const store = useStore();
    const isShowLoading = computed(() => {
      return !sliders.value.length && !albums.value.length;
    });
    getRecommend<IRecommend>().then((res) => {
      albums.value = res.albums;
      sliders.value = res.sliders;
    });

    /**
     * 选择专辑
     * @param { IRecommendAlbums } album
     */
    const selectItem = (album: IRecommendAlbums) => {
      selectedAlbum.value = album;
      store.commit(CACHE_ALBUM_INFO, album);
      router.push({
        name: "albumDetail",
        params: {
          id: album.id,
        },
      });
    };

    return {
      sliders,
      albums,
      isShowLoading,
      loadingTitle,
      selectedAlbum,
      selectItem,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
