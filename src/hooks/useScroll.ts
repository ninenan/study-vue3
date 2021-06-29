/*
 * @Author: NineNan
 * @Date: 2021-05-23 14:11:58
 * @LastEditTime: 2021-06-29 10:51:29
 * @LastEditors: Please set LastEditors
 * @Description: useScroll
 * @FilePath: /study_vue03/src/hooks/useScroll.ts
 */
import BScroll, { Options } from "@better-scroll/core";
import IBScroll from "@better-scroll/core/dist/types/index";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, Ref, ref, SetupContext } from "vue";

BScroll.use(ObserveDOM);

export const useScroll = (
  wrapperRef: Ref,
  options: Options,
  context: SetupContext
): Ref => {
  const scroll = ref<IBScroll>();

  onMounted(() => {
    const scrollValue: any = (scroll.value = new BScroll(wrapperRef.value, {
      ...options,
      observeDOM: true,
    }));

    if (options.probeType && options.probeType > 0) {
      scrollValue.on("scroll", (pos: { x: number; y: number }) => {
        context.emit("scroll", pos);
      });
    }
  });

  onUnmounted(() => {
    scroll.value?.destroy();
  });

  return scroll;
};
