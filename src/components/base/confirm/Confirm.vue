<!--
 * @Author: NineNan
 * @Date: 2021-07-06 22:31:34
 * @LastEditTime: 2021-07-06 22:36:04
 * @LastEditors: Please set LastEditors
 * @Description: confirm
 * @FilePath: /study_vue03/src/components/base/confirm/confirm.vue
-->
<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">{{ text }}</p>
            <div class="operate">
              <div class="operate-btn left" @click="confirm">
                {{ confirmBtnText }}
              </div>
              <div class="operate-btn" @click="cancel">{{ cancelBtnText }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  name: "confirm",
  props: {
    text: {
      type: String,
      default: "",
    },
    confirmBtnText: {
      type: String,
      default: "确定",
    },
    cancelBtnText: {
      type: String,
      default: "取消",
    },
  },
  emits: ["confirm", "cancel"],
  setup(props, context) {
    const visible = ref(false);

    const show = () => {
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };
    const confirm = () => {
      hide();
      context.emit("confirm");
    };
    const cancel = () => {
      hide();
      context.emit("cancel");
    };

    return {
      visible,
      show,
      confirm,
      cancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: $color-background-d;
  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;
    .confirm-content {
      animation: confirm-zoom-in 0.3s;
    }
  }
  &.confirm-fade-leave-active {
    animation: confirm-fadeout 0.3s;
    .confirm-content {
      animation: confirm-zoom-out 0.3s;
    }
  }
  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .confirm-content {
      width: 270px;
      border-radius: 13px;
      background: $color-highlight-background;
      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: $font-size-large;
        color: $color-text-l;
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-large;
        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid $color-background-d;
          color: $color-text-l;
          &.left {
            border-right: 1px solid $color-background-d;
            color: $color-text;
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confirm-fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
