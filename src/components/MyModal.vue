<!--
 * @Author: NineNan
 * @Date: 2021-05-07 22:42:02
 * @LastEditTime: 2021-05-26 16:40:11
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
import { defineComponent, toRef, toRefs, watch } from "vue";
export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
    },
  },
  emits: {
    closeModal: (val: number) => val,
  },
  setup(props, context) {
    // 为什么不适用解构的语法
    // 因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性 --官网描述
    const { isShow } = toRefs(props); // 使用解构和toRefs来获取props中定义的值
    console.log("isShow :>> ", isShow.value);

    // 如果 title 是可选的 prop，则传入的 props 中可能没有 title 。
    // 在这种情况下，toRefs 将不会为 title 创建一个 ref 。你需要使用 toRef 替代它：
    const title = toRef(props, "title");
    console.log("title :>> ", title.value);

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
