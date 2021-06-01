/*
 * @Author: NineNan
 * @Date: 2021-06-01 15:49:54
 * @LastEditTime: 2021-06-01 17:05:19
 * @LastEditors: Please set LastEditors
 * @Description: song
 * @FilePath: \study-vue3\src\api\song.ts
 */
import { get } from "@/service/http";
interface ISingerDetailsRes {
  album: string;
  duration: number;
  id: number;
  mid: string;
  name: string;
  pic: string;
  singer: string;
  url: string;
}

export const processSongs = (
  songs: ISingerDetailsRes[]
): Promise<ISingerDetailsRes[]> => {
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
  }) as Promise<ISingerDetailsRes[]>;
};
