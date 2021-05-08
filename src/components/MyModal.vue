<!--
 * @Author: NineNan
 * @Date: 2021-05-07 22:42:02
 * @LastEditTime: 2021-05-08 15:57:51
 * @LastEditors: Please set LastEditors
 * @Description: MyModal
 * @FilePath: /study_vue03/src/components/MyModal.vue
-->
<template>
  <teleport to="#modal" />
  <div class="modal" v-if="isShow">
    <p>
      <slot>MyModal!!!</slot>
    </p>
    <a-button @click="closeModal">close</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch } from "vue";
export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
    },
  },
  emits: {
    closeModal: (val: number) => {
      return val;
    },
  },
  setup(props, context) {
    watch(
      () => props.isShow,
      (newVal) => {
        console.log("newVal :>> ", newVal);
      }
    );
    const closeModal = () => {
      context.emit("closeModal", 123);
    };

    return {
      closeModal,
    };
  },
});
</script>
<style lang="scss" scoped>
.modal {
  width: 200px;
  height: 200px;
  border: 1px solid black;
}
</style>
