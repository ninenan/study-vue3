/*
 * @Author: NineNan
 * @Date: 2021-05-10 15:28:42
 * @LastEditTime: 2021-05-10 15:58:57
 * @LastEditors: Please set LastEditors
 * @Description: useClickOutside
 * @FilePath: \study-vue3\src\hooks\useClickOutside.ts
 */
import { ref, Ref, onMounted, onUnmounted } from "vue";

export default function useClickOutside(
  element: Ref<null | HTMLElement>
): Ref<boolean> {
  const isClickOutside = ref(false);
  const handler = (event: MouseEvent) => {
    if (element.value) {
      isClickOutside.value = !element.value.contains(
        event.target as HTMLElement
      );
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });

  return isClickOutside;
}
