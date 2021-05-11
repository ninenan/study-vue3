<!--
 * @Author: NineNan
 * @Date: 2021-05-11 10:40:39
 * @LastEditTime: 2021-05-11 16:31:43
 * @LastEditors: Please set LastEditors
 * @Description: ValidateForm
 * @FilePath: \study-vue3\src\components\ValidateForm.vue
-->
<template>
  <form>
    <slot></slot>
    <div class="mt-20" @click.prevent="formSubmit">
      <slot name="button">
        <a-button>提交</a-button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";

type IFun = () => boolean;
// type ICallback = (fun: IFun) => void;

export const emitter = mitt();
export default defineComponent({
  emits: ["submitForm"],
  setup(props, context) {
    const formSubmit = () => {
      let result = true;
      if (funArr.length) {
        result = funArr.map((fun) => fun()).every((result) => result);
      }
      context.emit("submitForm", result);
    };
    let funArr: IFun[] = [];
    const callback = (fun: IFun | undefined) => {
      if (fun) {
        funArr.push(fun);
      }
    };

    emitter.on("form-input-emit", callback);

    onUnmounted(() => {
      emitter.off("form-input-emit", callback);
      funArr = [];
    });
    return {
      formSubmit,
    };
  },
});
</script>
<style lang="scss" scoped></style>
