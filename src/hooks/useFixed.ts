/*
 * @Author: NineNan
 * @Date: 2021-05-24 22:39:14
 * @LastEditTime: 2021-05-25 22:41:57
 * @LastEditors: Please set LastEditors
 * @Description: useFixed
 * @FilePath: /study_vue03/src/hooks/useFixed.ts
 */
import { nextTick, ref, watch, Ref, computed, ComputedRef } from "vue";

interface IUseFixed {
  groupRef: Ref<any>;
  onScroll: (pos: { x: number; y: number }) => void;
  fixedTitle: Ref<string>;
  fixedStyle: ComputedRef<{
    transform: string;
  }>;
}

export default function useFixed(props: any): IUseFixed {
  const TITLE_HEIGHT = 30;
  const listHeights = ref<number[]>([]);
  const groupRef = ref();
  const scrollY = ref(0);
  const currentIndex = ref(0);
  const distance = ref(0);

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return "";
    }
    const currentSingerList = props.singersList[currentIndex.value];
    return currentSingerList ? currentSingerList.title : "";
  });

  const fixedStyle = computed(() => {
    const distanceVal = distance.value;
    const diff =
      distanceVal > 0 && distanceVal < TITLE_HEIGHT
        ? distanceVal - TITLE_HEIGHT
        : 0;
    return {
      transform: `translate3d(0, ${diff}px, 0)`,
    };
  });

  watch(
    () => props.singersList,
    async () => {
      await nextTick();
      calculate();
    }
  );

  watch(scrollY, (newY) => {
    const listHeighthsVal: number[] = listHeights.value;
    for (let index = 0; index < listHeighthsVal.length - 1; index++) {
      const heightTop = listHeighthsVal[index];
      const heightBottom = listHeighthsVal[index + 1];
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = index;
        distance.value = heightBottom - newY;
      }
    }
  });

  function calculate() {
    const listHeightsVal = listHeights.value;
    const list: HTMLElement[] = groupRef.value.children;
    let height = 0;
    listHeightsVal.length = 0;
    listHeightsVal.push(height);

    for (let index = 0; index < list.length; index++) {
      height += list[index].clientHeight;
      listHeightsVal.push(height);
    }
  }

  function onScroll(pos: { x: number; y: number }) {
    scrollY.value = -pos.y;
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
  };
}
