<!--
 * @Author: your name
 * @Date: 2021-05-17 23:09:40
 * @LastEditTime: 2021-06-10 23:35:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/components/base/Layout.vue
-->
<template>
  <div>
    <router-view />
    <Player />
  </div>
</template>
<script lang="ts">
import Player from "@/components/Player/Player.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Player,
  },
});
</script>
