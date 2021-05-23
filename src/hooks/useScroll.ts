/*
 * @Author: NineNan
 * @Date: 2021-05-23 14:11:58
 * @LastEditTime: 2021-05-23 14:59:27
 * @LastEditors: Please set LastEditors
 * @Description: useScroll
 * @FilePath: /study_vue03/src/hooks/useScroll.ts
 */
import BScroll, { Options } from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, Ref, ref } from "vue";

export interface IScroll {
  scroll: Ref;
}

BScroll.use(ObserveDOM);

export const useScroll = (wrapperRef: Ref, options: Options): IScroll => {
  const scroll = ref();

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      ...options,
      observeDOM: true,
    });
  });

  onUnmounted(() => {
    scroll.value.destroy();
  });

  return { scroll };
};
