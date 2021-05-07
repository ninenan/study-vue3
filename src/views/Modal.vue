<!--
 * @Author: NineNan
 * @Date: 2021-05-07 22:33:16
 * @LastEditTime: 2021-05-07 23:01:18
 * @LastEditors: Please set LastEditors
 * @Description: Modal teleport
 * @FilePath: /study_vue03/src/views/Modal.vue
-->
<template>
  <div class="modal">
    <h1>子组件modal</h1>
    <a-button @click="open">openModal</a-button>
    <my-modal :isShow="isShow" @closeModal="closeModal"
      >我是自定义的内容</my-modal
    >
  </div>
</template>
<script lang="ts">
import MyModal from "@/components/MyModal.vue";
import { ref } from "vue";
export default {
  components: {
    MyModal,
  },
  setup() {
    const isShow = ref(false);
    const open = () => {
      isShow.value = true;
    };
    const closeModal = () => {
      isShow.value = false;
    };

    return {
      isShow,
      open,
      closeModal,
    };
  },
};
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .ant-btn {
    margin-bottom: 10px;
  }
}
</style>
