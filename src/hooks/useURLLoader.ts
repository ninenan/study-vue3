/*
 * @Author: NineNan
 * @Date: 2021-05-06 22:47:34
 * @LastEditTime: 2021-05-07 21:53:54
 * @LastEditors: Please set LastEditors
 * @Description: useURLLoader
 * @FilePath: /study_vue03/src/hooks/useURLLoader.ts
 */
import { ref } from "vue";
import axios from "axios";

// interface IUseURLLoader<T> {
//   result: Ref<T | null>;
//   isShowLoading: Ref<boolean>;
//   error: Ref<null>;
// }

export default function useURLLoader<T>(url: string) {
  const result = ref<T | null>(null);
  const isShowLoading = ref<boolean>(true);
  const error = ref(null);

  axios
    .get(url)
    .then((res) => {
      result.value = res.data;
      isShowLoading.value = false;
    })
    .catch((err) => {
      error.value = err;
      isShowLoading.value = false;
    });

  return {
    result,
    isShowLoading,
    error,
  };
}
