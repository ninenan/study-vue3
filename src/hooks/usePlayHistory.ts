/*
 * @Author: NineNan
 * @Date: 2021-08-21 21:51:30
 * @LastEditTime: 2021-08-21 22:01:03
 * @LastEditors: Please set LastEditors
 * @Description: 播放历史
 * @FilePath: /study_vue03/src/hooks/usePlayHistory.ts
 */
import { useStore } from "@/store";
import { SET_PLAY_HISTORY, STORAGE } from "@/helpers/constant";
import { save } from "@/helpers/storage";
import { ISingerDetailsInfo } from "@/types";

export interface IUsePlayHistory {
  savePlayHistory: (song: ISingerDetailsInfo) => void;
}

export default function usePlayHistory(): IUsePlayHistory {
  const store = useStore();
  const maxLength = 200;

  const savePlayHistory = (song: ISingerDetailsInfo) => {
    const songs = save(
      song,
      STORAGE.playHistory,
      (item) => item.id === song.id,
      maxLength
    );

    store.commit(SET_PLAY_HISTORY, songs);
  };

  return {
    savePlayHistory,
  };
}
