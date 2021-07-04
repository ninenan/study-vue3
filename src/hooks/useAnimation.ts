/*
 * @Author: NineNan
 * @Date: 2021-07-02 20:54:52
 * @LastEditTime: 2021-07-04 20:26:31
 * @LastEditors: Please set LastEditors
 * @Description: useAnimation
 * @FilePath: /study_vue03/src/hooks/useAnimation.ts
 */
import { ref, Ref } from "vue";
import animations from "create-keyframe-animation";

export interface IUseAnimation {
  cdWrapperRef: Ref<HTMLElement | null>;
  enter: (el: HTMLElement, done: any) => void;
  afterEnter: () => void;
  leave: (el: HTMLElement, done: any) => void;
  afterLeave: () => void;
}

export default function useAnimation(): IUseAnimation {
  const cdWrapperRef = ref<HTMLElement | null>(null);
  let entering = false;
  let leaving = false;

  const getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    const scale = targetWidth / width;
    console.log("object :>> ", {
      x,
      y,
      scale,
    });
    return {
      x,
      y,
      scale,
    };
  };

  const enter = (el: HTMLElement, done: any) => {
    if (leaving) {
      afterLeave();
    }
    entering = true;
    const { x, y, scale } = getPosAndScale();

    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };

    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 600,
        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    });

    animations.runAnimation(cdWrapperRef.value, "move", done);
  };

  const afterEnter = () => {
    entering = false;
    animations.unregisterAnimation("move");
    (cdWrapperRef.value as HTMLElement).style.animation = "";
  };

  const leave = (el: HTMLElement, done: any) => {
    if (entering) {
      afterEnter();
    }

    leaving = true;
    const { x, y, scale } = getPosAndScale();
    const cdWrapperEl = cdWrapperRef.value;
    if (cdWrapperEl) {
      cdWrapperEl.style.transition = "all .6s cubic-bezier(0.45, 0, 0.55, 1)";
      cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      cdWrapperEl.addEventListener("transitionend", next);
    }

    function next() {
      cdWrapperEl?.removeEventListener("transitionend", next);
      done();
    }
  };

  const afterLeave = () => {
    leaving = false;
    const cdWrapperEL = cdWrapperRef.value;

    if (cdWrapperEL) {
      cdWrapperEL.style.transition = "";
      cdWrapperEL.style.transform = "";
    }
  };

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave,
  };
}
