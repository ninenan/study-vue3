<!--
 * @Author: your name
 * @Date: 2021-05-10 20:54:23
 * @LastEditTime: 2021-05-10 22:48:55
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

interface IInputRef {
  val: string;
  isError: boolean;
  message: string;
}

export default defineComponent({
  props: {
    rules: Array as PropType<IRules[]>,
    modalValue: String,
  },

  emits: ["update:modalValue"],

  setup(props, context) {
    console.log("modalValue :>> ", props.modalValue);
    console.log("rules :>> ", props.rules);
    const inputRef: IInputRef = reactive({
      val: props.modalValue || "",
      isError: false,
      message: "",
    });
    const updateValue = (event: KeyboardEvent) => {
      const targetValue = (event.target as HTMLInputElement).value;
      // console.log("targetValue :>> ", targetValue);
      inputRef.val = targetValue;
      context.emit("update:modalValue", targetValue);
    };
    const validateInput = () => {
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
