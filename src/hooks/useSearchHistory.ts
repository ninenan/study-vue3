/*
 * @Author: NineNan
 * @Date: 2021-08-17 23:14:53
 * @LastEditTime: 2021-08-18 13:42:02
 * @LastEditors: Please set LastEditors
 * @Description: 搜索历史
 * @FilePath: /study_vue03/src/hooks/useSearchHistory.ts
 */
import { save, remove } from "@/helpers/storage";
import { STORAGE, SET_SEARCH_HISTORY } from "@/helpers/constant";
import { useStore } from "@/store";

export interface IUseSearchHistory {
  saveSearchHistory: (params: string) => void;
  deleteSearchHistory: (params: string) => void;
  clearSearchHistory: () => void;
}

export default function useSearchHistory(): IUseSearchHistory {
  const maxLength = 200;
  const store = useStore();

  function saveSearchHistory(params: string) {
    const searchHistory = save<string>(
      params,
      STORAGE.searchHistory,
      (item) => item === params,
      maxLength
    );

    store.commit(SET_SEARCH_HISTORY, searchHistory);
  }

  function deleteSearchHistory(params: string) {
    const searchHistory = remove<string>(
      STORAGE.searchHistory,
      (item) => item === params
    );

    store.commit(SET_SEARCH_HISTORY, searchHistory);
  }

  function clearSearchHistory() {
    localStorage.removeItem(STORAGE.searchHistory);
    store.commit(SET_SEARCH_HISTORY, []);
  }

  return {
    saveSearchHistory,
    deleteSearchHistory,
    clearSearchHistory,
  };
}
