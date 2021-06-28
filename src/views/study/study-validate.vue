<!--
 * @Author: NineNan
 * @Date: 2021-05-10 16:52:52
 * @LastEditTime: 2021-05-11 16:16:02
 * @LastEditors: Please set LastEditors
 * @Description: validate form
 * @FilePath: \study-vue3\src\views\validateForm.vue
-->
<template>
  <div>
    <validate-form @submit-form="submit">
      <validate-input
        :rules="rules"
        v-model="emailVal"
        placeholder="请输入邮箱"
        type="text"
      />
      <validate-input
        class="mt-20"
        :rules="passwordRules"
        v-model="password"
        placeholder="请输入密码"
        type="password"
      />
      <template #button>
        <a-button type="primary">提 交</a-button>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref, Ref } from "vue";
import ValidateInput from "@components/ValidateInput.vue";
import ValidateForm from "@components/ValidateForm.vue";
import { IRules } from "@/types/index";

interface IValidateForm {
  rules: IRules[];
  emailVal: Ref<string>;
  passwordRules: IRules[];
  submit: (val: boolean) => void;
  password: Ref<string>;
}

export default {
  components: {
    "validate-input": ValidateInput,
    "validate-form": ValidateForm,
  },
  setup(): IValidateForm {
    const emailVal = ref("");
    const password = ref("");
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

    const passwordRules: IRules[] = reactive([
      {
        type: "required",
        message: "请输入密码",
      },
    ]);

    const submit = (val: boolean) => {
      console.log("val :>> ", val);
    };

    return {
      rules,
      emailVal,
      passwordRules,
      submit,
      password,
    };
  },
};
</script>
<style lang="scss" scoped>
.form-error {
  color: #ff7875;
}
</style>
