/*
 * @Author: NineNan
 * @Date: 2021-05-23 14:11:58
 * @LastEditTime: 2021-05-26 15:30:48
 * @LastEditors: Please set LastEditors
 * @Description: useScroll
 * @FilePath: /study_vue03/src/hooks/useScroll.ts
 */
import BScroll, { Options } from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, onUnmounted, Ref, ref, SetupContext } from "vue";

BScroll.use(ObserveDOM);

export const useScroll = (
  wrapperRef: Ref,
  options: Options,
  context: SetupContext
): Ref => {
  const scroll = ref();

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
    scroll.value.destroy();
  });

  return scroll;
};
