/*
 * @Author: NineNan
 * @Date: 2021-06-28 22:10:16
 * @LastEditTime: 2021-06-28 23:29:50
 * @LastEditors: Please set LastEditors
 * @Description: useMiddleInteractive
 * @FilePath: /study_vue03/src/hooks/useMiddleInteractive.ts
 */
import { ref, reactive, Ref } from "vue";

export interface IUseMiddleInteractive {
  currentShow: Ref<string>;
  middleLStyle: {
    opacity: number;
    transitionDuration: string;
  };
  middleRStyle: {
    transform: string;
    transitionDuration: string;
  };
  onMiddleTouchStart: (event: TouchEvent) => void;
  onMiddleTouchMove: (event: TouchEvent) => void;
  onMiddleTouchEnd: () => void;
}

export default function useMiddleInteractive(): IUseMiddleInteractive {
  const currentShow = ref("cd");
  const middleLStyle = reactive({
    opacity: 1,
    transitionDuration: "0ms",
  });
  const middleRStyle = reactive({
    transform: "none",
    transitionDuration: "0ms",
  });

  const touch: {
    startX: number;
    startY: number;
    directionLocked: string;
    percent: number;
  } = {
    startX: 0,
    startY: 0,
    directionLocked: "",
    percent: 0,
  };
  let currentView = "cd";

  const onMiddleTouchStart = (event: TouchEvent) => {
    touch.startX = event.touches[0].pageX;
    touch.startY = event.touches[0].pageY;
    touch.directionLocked = "";
  };

  const onMiddleTouchMove = (event: TouchEvent) => {
    const delX = event.touches[0].pageX - touch.startX;
    const delY = event.touches[0].pageY - touch.startY;
    const absDelX = Math.abs(delX);
    const absDelY = Math.abs(delY);

    if (!touch.directionLocked) {
      touch.directionLocked = absDelX >= absDelY ? "h" : "v";
    }

    if (touch.directionLocked === "v") {
      // 如果上下移动大于左右移动 直接return
      return;
    }

    const left = currentView === "cd" ? 0 : -window.innerWidth;
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + delX));
    touch.percent = Math.abs(offsetWidth / window.innerWidth);

    if (currentView === "cd") {
      currentShow.value = touch.percent > 0.2 ? "lyric" : "cd";
    } else {
      currentShow.value = touch.percent < 0.8 ? "cd" : "lyric";
    }

    middleLStyle.opacity = 1 - touch.percent;
    middleRStyle.transitionDuration = "0ms";
    middleRStyle.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const onMiddleTouchEnd = () => {
    let offsetWidth = 0;
    let opacity = 1;
    if (currentShow.value === "cd") {
      currentView = "cd";
      offsetWidth = 0;
      opacity = 1;
    } else {
      currentView = "lyric";
      offsetWidth = -window.innerWidth;
      opacity = 0;
    }

    const duration = 300;
    middleLStyle.opacity = opacity;
    middleLStyle.transitionDuration = `${duration}ms`;

    middleRStyle.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    middleRStyle.transitionDuration = `${duration}ms`;
  };

  return {
    currentShow,
    middleLStyle,
    middleRStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd,
  };
}
