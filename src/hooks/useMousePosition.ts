/*
 * @Author: NineNan
 * @Date: 2021-05-06 21:55:57
 * @LastEditTime: 2021-05-06 22:26:48
 * @LastEditors: Please set LastEditors
 * @Description: useMousePosition
 * @FilePath: /study_vue03/src/hooks/useMousePosition.ts
 */
import { reactive, onMounted, onUnmounted, toRefs } from "vue";

interface IPosition {
  x: number;
  y: number;
}

export default function useMousePosition() {
  const position: IPosition = reactive({
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
