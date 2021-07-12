<!--
 * @Author: your name
 * @Date: 2021-05-17 23:09:40
 * @LastEditTime: 2021-07-12 23:32:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/components/base/Layout.vue
-->
<template>
  <div>
    <router-view :style="viewStyle" />
    <Player />
  </div>
</template>
<script lang="ts">
import Player from "@/components/Player/Player.vue";
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  components: {
    Player,
  },
  setup() {
    const store = useStore();
    const playList = computed(() => store.state.music.playList);
    const viewStyle = computed(() => {
      const bottom = playList.value.length ? "60px" : "0";
      return {
        bottom,
      };
    });

    return {
      viewStyle,
    };
  },
});
</script>
