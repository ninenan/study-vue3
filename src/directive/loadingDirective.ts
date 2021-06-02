/*
 * @Author: NineNan
 * @Date: 2021-05-23 19:39:44
 * @LastEditTime: 2021-06-02 16:28:50
 * @LastEditors: Please set LastEditors
 * @Description: loadingDirective
 * @FilePath: /study_vue03/src/directive/loadingDirective.ts
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createApp, DirectiveBinding } from "vue";
import Loading from "@/components/base/loading/Loading.vue";

const loadingDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    const title = binding.arg;

    el.instance = instance;
    if (binding.value) {
      append(el);
    }
    if (typeof title !== "undefined") {
      el.instance.setTitle(title);
    }
  },

  updated(el: any, binding: DirectiveBinding) {
    const title = binding.arg;
    if (typeof title !== "undefined") {
      el.instance.setTitle(title);
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
  },
};

function append(el: any) {
  const style = getComputedStyle(el);
  if (!["absolute", "fixed", "relative"].includes(style.position)) {
    addClass(el, "g-relative");
  }
  el.appendChild(el.instance.$el);
}

function remove(el: any) {
  removeClass(el, "g-relative");
  el.removeChild(el.instance.$el);
}

function addClass(el: HTMLElement, className: string) {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
}

function removeClass(el: HTMLElement, className: string) {
  el.classList.remove(className);
}

export default loadingDirective;
