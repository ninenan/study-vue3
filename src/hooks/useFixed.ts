/*
 * @Author: NineNan
 * @Date: 2021-05-24 22:39:14
 * @LastEditTime: 2021-05-24 23:51:13
 * @LastEditors: Please set LastEditors
 * @Description: useFixed
 * @FilePath: /study_vue03/src/hooks/useFixed.ts
 */
import { nextTick, ref, watch, Ref, computed } from "vue";

interface IUseFixed {
  groupRef: Ref<any>;
  onScroll: (pos: { x: number; y: number }) => void;
  fixedTitle: Ref<string>;
}

export default function useFixed(props: any): IUseFixed {
  const listHeights = ref<number[]>([]);
  const groupRef = ref();
  const scrollY = ref(0);
  const currentIndex = ref(0);
  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return "";
    }
    const currentSingerList = props.singersList[currentIndex.value];
    return currentSingerList ? currentSingerList.title : "";
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
      }
    }
  });

  function calculate() {
    const listHeightsVal = listHeights.value;
    const list: HTMLElement[] = groupRef.value.children;
    let height = 0;

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
  };
}
