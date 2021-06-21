/*
 * @Author: NineNan
 * @Date: 2021-06-21 22:38:28
 * @LastEditTime: 2021-06-21 23:27:08
 * @LastEditors: Please set LastEditors
 * @Description: useFavorites 设置收藏歌曲列表
 * @FilePath: /study_vue03/src/hooks/useFavorites.ts
 */
import { useStore } from "@/store";
import { computed } from "vue";
import { ISingerDetailsInfo } from "@/types";

export interface IUseFavorites {
  getFavoritesIcon: (song: ISingerDetailsInfo) => string;
}

export default function useFavorites(): IUseFavorites {
  const store = useStore();
  const favoritesList = computed(() => store.state.music.favoritesList);

  /**
   * 返回 收藏icon
   * @param song ISingerDetailsInfo
   * @returns string icon-love/icon-not-love
   */
  const getFavoritesIcon = (song: ISingerDetailsInfo): string => {
    return isInFavoritesList(song) ? "icon-love" : "icon-not-love";
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
  };
}
