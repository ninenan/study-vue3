<!--
 * @Author: NineNan
 * @Date: 2021-05-10 16:52:52
 * @LastEditTime: 2021-05-10 18:03:38
 * @LastEditors: Please set LastEditors
 * @Description: validate form
 * @FilePath: \study-vue3\src\views\validateForm.vue
-->
<template>
  <div>
    <div>
      <label for="name">邮箱</label>
      {{ user.name }}
      <a-input v-model:value="user.email" id="name" @blur="validateEmail" />
      <div v-if="errorInfo.error" class="form-error">
        {{ errorInfo.message }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive } from "vue";

interface IUser {
  email: string;
  name: string;
}

interface IErrorInfo {
  message: string;
  error: boolean;
  val: string;
}

interface IValidateForm {
  user: IUser;
  validateEmail: () => void;
  errorInfo: IErrorInfo;
}

export default {
  setup(): IValidateForm {
    const user: IUser = reactive({
      email: "",
      name: "NineNan",
    });
    const errorInfo = reactive({
      message: "",
      error: false,
      val: "",
    });
    const validateEmail = () => {
      if (user.email.trim() === "") {
        errorInfo.error = true;
        errorInfo.message = "请输入邮箱";
        return;
      } else {
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            user.email.trim()
          )
        ) {
          errorInfo.error = true;
          errorInfo.message = "请输入正确的邮箱";
          return;
        }
      }
      errorInfo.error = false;
    };

    return {
      user,
      validateEmail,
      errorInfo,
    };
  },
};
</script>
<style lang="scss" scoped>
.form-error {
  color: #ff7875;
}
</style>
