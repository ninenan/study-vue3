/*
 * @Author: NineNan
 * @Date: 2021-06-29 21:54:02
 * @LastEditTime: 2021-07-06 22:13:27
 * @LastEditors: Please set LastEditors
 * @Description: useMiddleSlider
 * @FilePath: /study_vue03/src/hooks/useMiddleSlider.ts
 */
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
  Ref,
} from "vue";
import { useStore } from "@/store";
import BScroll from "@better-scroll/core";
import IBScroll from "@better-scroll/core/dist/types/index";
import Slide from "@better-scroll/slide";
import { SET_CURRENT_INDEX, SET_PLAYING_STATUE } from "@/helpers/constant";

BScroll.use(Slide);

export interface IUseMiddleSlider {
  slider: Ref<any | null>;
  sliderWrapperRef: Ref<HTMLElement | null>;
}

export default function useMiddleSlider(): IUseMiddleSlider {
  const store = useStore();
  const slider = ref<any | null>(null);
  const sliderWrapperRef = ref<HTMLElement | null>(null);
  const isFullScreen = computed(() => store.state.music.isFullScreen);
  const playList = computed(() => store.state.music.playList);
  const currentIndex = computed(() => store.state.music.currentIndex);
  const isSliderShow = computed(() => !isFullScreen.value && !!playList.value);

  onMounted(() => {
    let sliderVal: IBScroll | null = null;
    watch(isSliderShow, async (newIsSliderShow) => {
      if (newIsSliderShow) {
        await nextTick();
        if (!sliderVal) {
          sliderVal = slider.value = new BScroll(
            sliderWrapperRef.value as HTMLElement,
            {
              click: true,
              scrollX: true,
              scrollY: false,
              momentum: false,
              bounce: false,
              probeType: 2,
              slide: {
                autoplay: false,
                loop: true,
              },
            }
          );

          sliderVal.on("slidePageChanged", ({ pageX }: any) => {
            store.commit(SET_CURRENT_INDEX, pageX);
          });
        } else {
          (sliderVal as IBScroll).refresh();
        }
        (sliderVal as IBScroll).goToPage(currentIndex.value, 0, 0);
      }
    });

    watch(currentIndex, (newCurrentIndex) => {
      if (sliderVal && isSliderShow.value) {
        sliderVal.goToPage(newCurrentIndex, 0, 0);
      }
    });

    watch(playList, async (newPlayList) => {
      if (sliderVal && isSliderShow.value && newPlayList.length) {
        await nextTick();
        sliderVal.refresh();
      }
    });
  });

  onUnmounted(() => {
    if (slider.value) {
      slider.value.destroy();
    }
  });

  return {
    slider, // 防止未来需求需要
    sliderWrapperRef,
  };
}
