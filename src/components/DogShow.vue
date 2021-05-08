<!--
 * @Author: NineNan
 * @Date: 2021-05-08 14:38:13
 * @LastEditTime: 2021-05-08 15:01:49
 * @LastEditors: Please set LastEditors
 * @Description: DogShow
 * @FilePath: \study-vue3\src\components\DogShow.vue
-->
<template>
  <div v-if="rawData.message">
    <img :src="rawData.message" alt="" />
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

interface IRawData {
  message: string;
  status: string;
}

export default defineComponent({
  async setup() {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    const rawData: IRawData = data;
    return {
      rawData,
    };
  },
});
</script>
<style lang="scss" scoped>
img {
  width: 200px;
  height: 200px;
}
</style>
