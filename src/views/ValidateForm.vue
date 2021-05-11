<!--
 * @Author: NineNan
 * @Date: 2021-05-10 16:52:52
 * @LastEditTime: 2021-05-11 09:26:31
 * @LastEditors: Please set LastEditors
 * @Description: validate form
 * @FilePath: \study-vue3\src\views\validateForm.vue
-->
<template>
  <div>
    <div>
      <validate-input :rules="rules" v-model="emailVal" />
    </div>
    {{ emailVal }}
  </div>
</template>
<script lang="ts">
import { reactive, ref, Ref } from "vue";
import ValidateInput from "@components/ValidateInput.vue";
import { IRules } from "@/types/index";

interface IValidateForm {
  rules: IRules[];
  emailVal: Ref<string>;
}

export default {
  components: {
    "validate-input": ValidateInput,
  },
  setup(): IValidateForm {
    const emailVal = ref("NNN");
    const rules: IRules[] = reactive([
      {
        type: "required",
        message: "请输入邮箱",
      },
      {
        type: "email",
        message: "请输入正确的邮箱",
      },
    ]);

    return {
      rules,
      emailVal,
    };
  },
};
</script>
<style lang="scss" scoped>
.form-error {
  color: #ff7875;
}
</style>
