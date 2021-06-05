/*
 * @Author: NineNan
 * @Date: 2021-06-05 22:38:49
 * @LastEditTime: 2021-06-05 22:48:21
 * @LastEditors: Please set LastEditors
 * @Description: useCreateLoadingLikeDirective
 * @FilePath: /study_vue03/src/hooks/useCreateLoadingLikeDirective.ts
 */
import { createApp, DirectiveBinding } from "vue";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default function useCreateLoadingLikeDirective(Components: any) {
  return {
    mounted(el: any, binding: DirectiveBinding) {
      const app = createApp(Components);
      const instance = app.mount(document.createElement("div"));
      const title = binding.arg;
      const name = Components.name;
      if (!el[name]) {
        el[name] = {};
      }
      el[name].instance = instance;

      if (binding.value) {
        append(el);
      }
      if (typeof title !== "undefined") {
        el[name].instance.setTitle(title);
      }
    },

    updated(el: any, binding: DirectiveBinding) {
      const title = binding.arg;
      const name = Components.name;

      if (typeof title !== "undefined") {
        el[name].instance.setTitle(title);
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el);
      }
    },
  };

  function append(el: any) {
    const name = Components.name;
    const style = getComputedStyle(el);
    if (!["absolute", "fixed", "relative"].includes(style.position)) {
      addClass(el, "g-relative");
    }
    el.appendChild(el[name].instance.$el);
  }

  function remove(el: any) {
    const name = Components.name;
    removeClass(el, "g-relative");
    el.removeChild(el[name].instance.$el);
  }

  function addClass(el: HTMLElement, className: string) {
    if (!el.classList.contains(className)) {
      el.classList.add(className);
    }
  }

  function removeClass(el: HTMLElement, className: string) {
    el.classList.remove(className);
  }
}
