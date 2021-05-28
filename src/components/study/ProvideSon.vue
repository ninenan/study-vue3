<!--
 * @Author: NineNan
 * @Date: 2021-05-28 14:55:48
 * @LastEditTime: 2021-05-28 15:28:40
 * @LastEditors: Please set LastEditors
 * @Description: ProvideSon
 * @FilePath: \study-vue3\src\components\study\ProvideSon.vue
-->
<template>
  <div class="mt-20">
    <p>
      longitude: <span>{{ useGeolocation.longitude }}</span>
    </p>
    <p>
      latitude: <span>{{ useGeolocation.latitude }}</span>
    </p>
    <p>
      useLocation: <span>{{ useLocation }}</span>
    </p>
    <p class="mt-20">
      <a-button @click="uploadLocation('North Pole')" type="primary"
        >uploadLocation</a-button
      >
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    const useGeolocation = inject("geolocation");
    const useLocation = inject("location");
    const uploadLocation = inject("uploadLocation");

    return {
      useGeolocation,
      useLocation,
      uploadLocation,
    };
  },
});
</script>

<style lang="scss" scoped>
p {
  span {
    color: $color-theme;
  }
}
</style>
