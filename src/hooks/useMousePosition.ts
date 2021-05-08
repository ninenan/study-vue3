/*
 * @Author: NineNan
 * @Date: 2021-05-06 21:55:57
 * @LastEditTime: 2021-05-08 10:03:03
 * @LastEditors: Please set LastEditors
 * @Description: useMousePosition
 * @FilePath: /study_vue03/src/hooks/useMousePosition.ts
 */
import { reactive, onMounted, onUnmounted, toRefs, Ref } from "vue";

interface IPosition<T> {
  x: T;
  y: T;
}

export default function useMousePosition(): IPosition<Ref<number>> {
  const position: IPosition<number> = reactive({
    x: 0,
    y: 0,
  });

  const mouseClick = (e: MouseEvent) => {
    position.x = e.pageX;
    position.y = e.pageY;
  };

  onMounted(() => {
    document.addEventListener("click", mouseClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", mouseClick);
  });

  return {
    ...toRefs(position),
  };
}
