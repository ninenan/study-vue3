<!--
 * @Author: your name
 * @Date: 2021-05-10 20:54:23
 * @LastEditTime: 2021-05-11 16:28:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study_vue03/src/components/ValidateInput.vue
-->
<template>
  <div class="validate-input">
    <div>
      <input
        type="text"
        :value="inputRef.val"
        @blur="validateInput"
        @input="updateValue"
        v-bind="$attrs"
      />
    </div>
    <div class="form-explain" v-if="inputRef.isError">
      {{ inputRef.message }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { IRules } from "@/types/index";
import { verifyCondition } from "@/helpers/utils";
import { emitter } from "./ValidateForm.vue";

interface IInputRef {
  val: string;
  isError: boolean;
  message: string;
}

type IValidateInput = () => boolean;

export default defineComponent({
  props: {
    rules: Array as PropType<IRules[]>,
    modelValue: String,
  },

  inheritAttrs: false,

  emits: ["update:modelValue"],

  setup(props, context) {
    const inputRef: IInputRef = reactive({
      val: props.modelValue || "",
      isError: false,
      message: "",
    });
    const updateValue = (event: KeyboardEvent) => {
      const targetValue = (event.target as HTMLInputElement).value;
      inputRef.val = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const validateInput: IValidateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule: IRules) => {
          let passed = true;
          inputRef.message = rule.message;
          passed = verifyCondition(inputRef.val, rule.type);
          return passed;
        });
        inputRef.isError = !allPassed;
        return allPassed;
      }
      return true;
    };

    emitter.emit("form-input-emit", validateInput);

    return {
      inputRef,
      validateInput,
      updateValue,
    };
  },
});
</script>
<style lang="scss" scoped>
.form-explain {
  clear: both;
  min-height: 23px;
  margin-top: -2px;
  color: #ff4d4f;
  font-size: 14px;
  line-height: 1.5715;
  transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}
</style>
