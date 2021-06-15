/*
 * @Author: NineNan
 * @Date: 2021-06-01 15:49:54
 * @LastEditTime: 2021-06-11 14:57:49
 * @LastEditors: Please set LastEditors
 * @Description: song
 * @FilePath: \study-vue3\src\api\song.ts
 */
import { get } from "@/service/http";
import { ISingerDetailsInfo } from "@/types/index";

export const processSongs = (
  songs: ISingerDetailsInfo[]
): Promise<ISingerDetailsInfo[]> => {
  if (!songs.length) {
    return Promise.resolve(songs);
  }

  return get("/api/getSongsUrl", {
    mid: songs.map((song) => {
      return song.mid;
    }),
  }).then((res: any) => {
    const map = res.map;
    return songs
      .map((song) => {
        song.url = map[song.mid];
        return song;
      })
      .filter((song) => {
        return song.url?.indexOf("vkey") > -1;
      });
  }) as Promise<ISingerDetailsInfo[]>;
};
