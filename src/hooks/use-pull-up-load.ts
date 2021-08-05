/*
 * @Author: NineNan
 * @Date: 2021-08-04 22:53:30
 * @LastEditTime: 2021-08-05 22:32:59
 * @LastEditors: Please set LastEditors
 * @Description: use-pull-up-load
 * @FilePath: /study_vue03/src/hooks/use-pull-up-load.ts
 */
import BScroll from "@better-scroll/core";
import IBScroll from "@better-scroll/core/dist/types/index";
import Pullup from "@better-scroll/pull-up";

import ObserveDom from "@better-scroll/observe-dom";
import { ref, onMounted, onUnmounted, Ref } from "vue";

BScroll.use(Pullup);
BScroll.use(ObserveDom);

export interface IUsePullUpLoad {
  scroll: Ref<IBScroll | undefined>;
  rootRef: Ref<HTMLElement | null>;
  isPullUpLoad: Ref<boolean>;
}

export default function usePullUpLoad(
  requestData: () => void,
  preventPullUpLoad: Ref<boolean>
): IUsePullUpLoad {
  const scroll = ref<IBScroll>();
  const rootRef = ref<HTMLElement | null>(null);
  const isPullUpLoad = ref(false);

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(
      rootRef.value as HTMLElement,
      {
        observeDOM: true,
        pullUpLoad: true,
        click: true,
      }
    ));

    scrollVal.on("pullingUp", pullingUpHandler);

    async function pullingUpHandler() {
      if (preventPullUpLoad.value) {
        scrollVal.finishPullUp();
        return;
      }

      isPullUpLoad.value = true;
      await requestData();
      scrollVal.finishPullUp();
      scrollVal.refresh();
      isPullUpLoad.value = false;
    }
  });

  onUnmounted(() => {
    scroll.value?.destroy();
  });

  return {
    scroll,
    rootRef,
    isPullUpLoad,
  };
}
