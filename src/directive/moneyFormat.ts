/*
 * @Author: your name
 * @Date: 2021-05-31 16:32:05
 * @LastEditTime: 2021-05-31 21:01:26
 * @LastEditors: Please set LastEditors
 * @Description: 金钱格式化
 * @FilePath: \study-vue3\src\directive\moneyFormat.ts
 */
import { DirectiveBinding } from "vue";
import { digitalFormatting } from "@/helpers/utils";

const moneyFormat = {
  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    el.innerHTML = digitalFormatting(+el.innerHTML);
    // console.log(binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding): void {
    el.innerHTML = digitalFormatting(+el.innerHTML);
    // console.log(binding);
  },
};

export default moneyFormat;
