<!--
 * @Author: NineNan
 * @Date: 2021-08-18 22:14:59
 * @LastEditTime: 2021-08-21 23:32:28
 * @LastEditors: Please set LastEditors
 * @Description: message
 * @FilePath: /study_vue03/src/components/base/message/Message.vue
-->
<template>
  <teleport to="body">
    <transition name="slide-down">
      <div class="message" v-show="visible" @click="hide">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
interface IMessage {
  visible: Ref<boolean>;
  show: () => void;
  hide: () => void;
}
export default {
  name: "message",
  props: {
    delay: {
      type: Number,
      default: 2000,
    },
  },
  setup(props: { delay: number }): IMessage {
    const visible = ref(false);

    let timer = setTimeout(() => {
      hide();
    }, props.delay);
    /**
     * 显示当前组件
     */
    const show = () => {
      visible.value = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        hide();
      }, props.delay);
    };
    /**
     * 隐藏当前组件
     */
    const hide = () => {
      clearTimeout(timer);
      visible.value = false;
    };
    return {
      visible,
      show,
      hide,
    };
  },
};
</script>

<style scoped lang="scss">
.message {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 400;
  background: $color-dialog-background;

  &.slide-down-enter-active,
  &.slide-down-leave-active {
    transition: all 0.3s;
  }

  &.slide-down-enter-from,
  &.slide-down-leave-to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>
