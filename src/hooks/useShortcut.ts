/*
 * @Author: NineNan
 * @Date: 2021-05-25 22:58:55
 * @LastEditTime: 2021-06-01 02:08:41
 * @LastEditors: Please set LastEditors
 * @Description: useShortcut
 * @FilePath: /study_vue03/src/hooks/useShortcut.ts
 */

import { computed, ComputedRef, ref, Ref } from "vue";
import { ISingerList } from "@/types";
// import Scroller from "@better-scroll/core";

interface IUseShortcut {
  shortcutList: ComputedRef<string>;
  onShortcutTouchStart: (e: any) => void;
  scrollRef: Ref<HTMLElement | null>;
  onShortcutTouchMove: (e: any) => void;
}

interface ITouch {
  startY: number;
  finishY: number;
  anchorIndex: number;
}

export default function useShortcut(
  props: any,
  groupRef: Ref<HTMLElement>
): IUseShortcut {
  const scrollRef = ref<HTMLElement | null>(null);
  const ANCHOR_HEIGHT = 18; // 字体高度

  const shortcutList = computed(() => {
    return props.singersList.map((singers: ISingerList) => {
      return singers.title;
    });
  });

  const touch: ITouch = {
    startY: 0,
    finishY: 0,
    anchorIndex: 0,
  };

  const onShortcutTouchStart = (e: any) => {
    const anchorIndex: number = parseInt(e.target.dataset.index);
    touch.startY = e?.touches[0]?.pageY;
    touch.anchorIndex = anchorIndex;

    scrollTo(anchorIndex);
  };

  const onShortcutTouchMove = (e: any) => {
    touch.finishY = e.touches[0].pageY;
    const delta = ((touch.finishY - touch.startY) / ANCHOR_HEIGHT) | 0; // 向下取整
    const anchorIndex = touch.anchorIndex + delta;
    scrollTo(anchorIndex);
  };

  const scrollTo = (index: number) => {
    if (isNaN(index)) {
      return;
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index));
    const scroll: any = (scrollRef.value as HTMLElement).scroll;
    const targetEl = groupRef.value.children[index];
    scroll.scrollToElement(targetEl, 0);
  };

  return {
    shortcutList,
    onShortcutTouchStart,
    scrollRef,
    onShortcutTouchMove,
  };
}
