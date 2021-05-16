<!--
 * @Author: NineNan
 * @Date: 2021-05-07 22:42:02
 * @LastEditTime: 2021-05-16 22:51:41
 * @LastEditors: Please set LastEditors
 * @Description: MyModal
 * @FilePath: /study_vue03/src/components/MyModal.vue
-->
<template>
  <teleport to="#modal">
    <div class="modal" v-if="isShow">
      <p>
        <slot>MyModal!!!</slot>
      </p>
      <a-button @click="closeModal" type="primary">close</a-button>
    </div>
  </teleport>
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
    closeModal: (val: number) => val,
  },
  setup(props, context) {
    watch(
      () => props.isShow,
      (newVal) => {
        console.log("newVal :>> ", newVal);
        newVal && document.body.appendChild(node);
        !newVal && document.body.removeChild(node);
      }
    );
    const closeModal = () => {
      context.emit("closeModal", 333);
    };

    const node = document.createElement("div");
    node.id = "modal";
    document.body.appendChild(node);

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
  @include FlexCenter();
  flex-direction: column;
}
</style>
