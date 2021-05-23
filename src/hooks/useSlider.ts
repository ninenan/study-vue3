/*
 * @Author: NineNan
 * @Date: 2021-05-22 21:37:55
 * @LastEditTime: 2021-05-22 23:42:08
 * @LastEditors: Please set LastEditors
 * @Description: useSlider
 * @FilePath: /study_vue03/src/hooks/useSlider.ts
 */
import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import { onMounted, ref, onUnmounted, Ref } from "vue";

export interface IUseSlider {
  slider: Ref<null>;
  currentPageIndex: Ref<number>;
}

BScroll.use(Slide);

export const useSlider = (wrapperRef: Ref): IUseSlider => {
  const currentPageIndex = ref(0);
  const slider = ref();

  onMounted(() => {
    const sliderValue = (slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    }));

    sliderValue.on("slideWillChange", (page: any) => {
      currentPageIndex.value = page.pageX;
    });
  });

  onUnmounted(() => {
    slider.value.destroy();
  });

  return {
    slider,
    currentPageIndex,
  };
};
