<!--
 * @Author: NineNan
 * @Date: 2021-05-07 22:33:16
 * @LastEditTime: 2021-05-16 22:38:29
 * @LastEditors: Please set LastEditors
 * @Description: Modal teleport
 * @FilePath: /study_vue03/src/views/Modal.vue
-->
<template>
  <div class="modal">
    <h1>子组件modal</h1>
    <a-button @click="open" type="primary">openModal</a-button>
    <my-modal :isShow="isShow" @close-modal="closeModal"
      >我是自定义的内容</my-modal
    >
  </div>
</template>
<script lang="ts">
import MyModal from "@/components/MyModal.vue";
import { ref, Ref } from "vue";

interface IModal {
  isShow: Ref<boolean>;
  open: () => void;
  closeModal: (val: number) => void;
}

export default {
  components: {
    MyModal,
  },
  setup(): IModal {
    const isShow = ref(false);
    const open = () => {
      isShow.value = true;
    };
    const closeModal = (val: number) => {
      console.log("closeModal :>> ", val);
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
