<!--
 * @Author: NineNan
 * @Date: 2021-07-01 09:43:45
 * @LastEditTime: 2021-07-01 11:14:19
 * @LastEditors: Please set LastEditors
 * @Description: study-slot
 * @FilePath: \study-vue3\src\views\study\study-slot.vue
-->
<template>
  <div>
    <h1>study-slot</h1>
    <div>
      <my-slot>
        <!-- <div class="mt-20">我是默认插槽</div> -->
        <template #default>
          <div class="mt-20">可以使用这种方式改变默认插槽</div>
        </template>
        <template #header>
          <div class="mt-20">我是header具名插槽</div>
        </template>

        <!-- <p>作用域插槽可以获取到子组件传的值（通过标签绑定属性的方式）</p> -->
        <!-- <p>可以使用解构的方式</p> -->
        <template #liSlot="{ index, item }">
          <div>{{ index }} - {{ item }}</div>
        </template>
        <!-- 动态插槽名 -->
        <template #[slotName]>
          <div class="mt-20">我是新定义的slot1</div>
        </template>
      </my-slot>
    </div>
  </div>
</template>
<script lang="ts">
import MySlot from "@/components/study/MySlot.vue";
import { Ref, ref } from "vue";

interface IStudySlot {
  slotName: Ref<string>;
}

export default {
  components: {
    "my-slot": MySlot,
  },
  setup(): IStudySlot {
    const slotName = ref("slot1");

    return {
      slotName,
    };
  },
};
</script>
<style lang="scss" scoped></style>
