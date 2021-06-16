<!--
 * @Author: NineNan
 * @Date: 2021-05-28 14:29:13
 * @LastEditTime: 2021-06-16 18:02:36
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
import { provide, reactive, ref, readonly, onUnmounted } from "vue";
import ProvideSon from "@/components/study/MyProvideSon.vue";

export interface IGeolocation {
  longitude: number;
  latitude: number;
}

export default {
  components: {
    ProvideSon,
  },
  setup(): void {
    // 使用reactive和ref使其具有响应式
    const geolocation = reactive<IGeolocation>({
      longitude: 100,
      latitude: 200,
    });
    const location = ref("North Pole");

    const uploadLocation = (value: string) => {
      location.value = value;
      console.log("location :>> ", location);
    };

    provide("geolocation", geolocation);
    provide("location", readonly(location)); // 使用readonly，子组件不能修改当前值，但是可以通过父组件传递的方法修改
    provide("uploadLocation", uploadLocation); // 传递修改location值的方法

    let timer = setTimeout(() => {
      geolocation.longitude = 200;
      geolocation.latitude = 300;
      location.value = "South Pole";
    }, 1000);

    timer;

    onUnmounted(() => {
      clearTimeout(timer);
    });
  },
};
</script>
<style lang="scss" scoped></style>
