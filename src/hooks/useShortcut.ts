/*
 * @Author: NineNan
 * @Date: 2021-05-25 22:58:55
 * @LastEditTime: 2021-05-25 23:57:17
 * @LastEditors: Please set LastEditors
 * @Description: useShortcut
 * @FilePath: /study_vue03/src/hooks/useShortcut.ts
 */

import { computed, ComputedRef, ref, Ref } from "vue";
import { ISingerList } from "@/types";

interface IUseShortcut {
  shortcutList: ComputedRef<string>;
  onShortcutTouchStart: (e: any) => void;
  scrollRef: Ref<HTMLElement | null>;
}

export default function useShortcut(
  props: any,
  groupRef: Ref<HTMLElement>
): IUseShortcut {
  const scrollRef = ref<HTMLElement | null>(null);

  const shortcutList = computed(() => {
    return props.singersList.map((singers: ISingerList) => {
      return singers.title;
    });
  });

  const onShortcutTouchStart = (e: any) => {
    const anchorIndex: number = e.target.dataset.index;
    // do nothing
    scrollTo(anchorIndex);
  };

  const scrollTo = (index: number) => {
    const scroll = (scrollRef.value as HTMLElement).scroll;
    const targetEl = groupRef.value.children[index];
    console.log("scroll :>> ", scroll);
    console.log("targetEl :>> ", targetEl);
    // scroll.scrollToElement(targetEl, 0);
  };

  return {
    shortcutList,
    onShortcutTouchStart,
    scrollRef,
  };
}
