<!--
 * @Author: NineNan
 * @Date: 2021-05-28 14:29:13
 * @LastEditTime: 2021-05-28 15:28:22
 * @LastEditors: Please set LastEditors
 * @Description: StudyProvide
 * @FilePath: \study-vue3\src\views\study\StudyProvide.vue
-->
<template>
  <div>
    <h1>StudyProvide</h1>
    <ProvideSon />
  </div>
</template>
<script lang="ts">
import { provide, reactive, readonly, ref } from "vue";
import ProvideSon from "@/components/study/ProvideSon.vue";
export default {
  components: {
    ProvideSon,
  },
  setup() {
    // 使用reactive和ref使其具有响应式
    const geolocation = reactive({
      longitude: 100,
      latitude: 200,
    });
    const location = ref("North Pole");

    const uploadLocation = (value: string) => {
      location.value = value;
      console.log("location :>> ", location);
    };

    provide("geolocation", readonly(geolocation));
    provide("location", readonly(location));
    provide("uploadLocation", uploadLocation); // 传递修改location值的方法

    setTimeout(() => {
      geolocation.longitude = 200;
      geolocation.latitude = 300;
      location.value = "South Pole";
    }, 1000);
  },
};
</script>
<style lang="scss" scoped></style>
