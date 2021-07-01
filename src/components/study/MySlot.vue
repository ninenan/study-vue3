<!--
 * @Author: NineNan
 * @Date: 2021-07-01 09:49:29
 * @LastEditTime: 2021-07-01 11:06:29
 * @LastEditors: Please set LastEditors
 * @Description: MySlot
 * @FilePath: \study-vue3\src\components\study\MySlot.vue
-->
<template>
  <div>
    <slot>默认插槽</slot>
    <slot name="header"> header具名插槽 </slot>
    <slot name="footer"> <div class="mt-20">footer具名插槽</div> </slot>

    <ul class="mt-20">
      <li v-for="(item, index) in arr" :key="item">
        <slot name="liSlot" :item="item" :index="index"></slot>
      </li>
    </ul>
    <slot name="slot1"> slot1 </slot>
    <slot name="slot2"> slot2 </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const arr = ref(["dog", "cat"]);

    return {
      arr,
    };
  },
});
</script>
<style lang="scss" scoped></style>
