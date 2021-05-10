<!--
 * @Author: NineNan
 * @Date: 2021-05-10 14:38:28
 * @LastEditTime: 2021-05-10 15:52:50
 * @LastEditors: Please set LastEditors
 * @Description: study dropdown
 * @FilePath: \study-vue3\src\views\DropDown.vue
-->
<template>
  <div class="dropdown">
    <div ref="dropdownRef">
      <a-button @click="operationBox"> showBox </a-button>
      <div class="box" v-if="isShowBox">我是盒子</div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, Ref, watch } from "vue";
import useClickOutside from "@/hooks/useClickOutside";
interface IDropdown {
  isShowBox: Ref<boolean>;
  operationBox: () => void;
  dropdownRef: Ref<null | HTMLElement>;
}

export default {
  setup(): IDropdown {
    const isShowBox = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const operationBox = () => {
      isShowBox.value = !isShowBox.value;
    };
    const isClickOutSide = useClickOutside(dropdownRef);

    watch(isClickOutSide, () => {
      if (isClickOutSide.value && isShowBox.value) {
        isShowBox.value = false;
      }
    });

    return {
      isShowBox,
      operationBox,
      dropdownRef,
    };
  },
};
</script>
<style lang="scss" scoped>
.dropdown {
  @include FlexCenter();
  flex-direction: column;
}
.box {
  width: 200px;
  height: 200px;
  border: 1px solid black;
  margin-top: 20px;
  @include FlexCenter();
}
</style>
