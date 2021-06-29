/*
 * @Author: NineNan
 * @Date: 2021-06-22 22:30:32
 * @LastEditTime: 2021-06-29 15:58:04
 * @LastEditors: Please set LastEditors
 * @Description: useCd
 * @FilePath: /study_vue03/src/hooks/useCd.ts
 */
import { useStore } from "@/store";
import { computed, Ref, ref, watch } from "vue";

export interface IUseCd {
  cdCls: Ref<string>;
  cdRef: Ref<HTMLElement | null>;
  cdImageRef: Ref<HTMLElement | null>;
}

export default function useCd(): IUseCd {
  const cdRef = ref<HTMLElement | null>(null);
  const cdImageRef = ref<HTMLElement | null>(null);

  const store = useStore();
  const isPlaying = computed(() => store.state.music.isPlaying);
  const cdCls = computed(() => {
    return isPlaying.value ? "playing" : "";
  });

  watch(isPlaying, (newIsPlaying) => {
    if (!newIsPlaying && cdRef.value && cdImageRef.value) {
      syncTransform(cdRef.value, cdImageRef.value);
    }
  });

  const syncTransform = (wrapper: HTMLElement, inner: HTMLElement): void => {
    const wrapperTransform = getComputedStyle(wrapper).transform;
    const innerTransform = getComputedStyle(inner).transform;
    wrapper.style.transform =
      wrapperTransform === "none"
        ? innerTransform
        : innerTransform.concat(" ", wrapperTransform);
  };

  return {
    cdCls,
    cdRef,
    cdImageRef,
  };
}
