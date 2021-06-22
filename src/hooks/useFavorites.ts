/*
 * @Author: NineNan
 * @Date: 2021-06-21 22:38:28
 * @LastEditTime: 2021-06-22 11:49:37
 * @LastEditors: Please set LastEditors
 * @Description: useFavorites 设置收藏歌曲列表
 * @FilePath: /study_vue03/src/hooks/useFavorites.ts
 */
import { useStore } from "@/store";
import { computed } from "vue";
import { ISingerDetailsInfo } from "@/types";
import { save, remove } from "@/helpers/storage";
import { STORAGE, SET_FAVORITES_LIST } from "@/helpers/constant";

export interface IUseFavorites {
  getFavoritesIcon: (song: ISingerDetailsInfo) => string;
  toggleFavorites: (song: ISingerDetailsInfo) => void;
}

export default function useFavorites(): IUseFavorites {
  const store = useStore();
  const favoritesList = computed(() => store.state.music.favoritesList);
  const MAX_LENGTH = 100;

  /**
   * 返回 收藏icon
   * @param song ISingerDetailsInfo
   * @returns string icon-love/icon-not-love
   */
  const getFavoritesIcon = (song: ISingerDetailsInfo): string => {
    return isInFavoritesList(song) ? "icon-love" : "icon-not-love";
  };
  /**
   * 切换收藏列表
   * @param song ISingerDetailsInfo
   */
  const toggleFavorites = (song: ISingerDetailsInfo): void => {
    let list: ISingerDetailsInfo[] = [];
    if (isInFavoritesList(song)) {
      list = remove<ISingerDetailsInfo>(STORAGE.favorites, compare);
    } else {
      list = save<ISingerDetailsInfo>(
        song,
        STORAGE.favorites,
        compare,
        MAX_LENGTH
      );
    }
    store.commit(SET_FAVORITES_LIST, list);

    function compare(item: ISingerDetailsInfo): boolean {
      return item.id === song.id;
    }
  };
  /**
   * 是否存在收藏列表中
   * @param song ISingerDetailsInfo
   * @returns
   */
  const isInFavoritesList = (song: ISingerDetailsInfo): boolean => {
    return favoritesList.value.findIndex((item) => item.id === song.id) !== -1;
  };

  return {
    getFavoritesIcon,
    toggleFavorites,
  };
}
