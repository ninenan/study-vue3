/*
 * @Author: NineNan
 * @Date: 2021-06-01 15:49:54
 * @LastEditTime: 2021-06-23 23:13:49
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

const lyricMap: {
  [prop: string]: string;
} = {};

/**
 * 获取歌词
 * @param song ISingerDetailsInfo
 */
export const getLyric = (song: ISingerDetailsInfo): Promise<string> => {
  if (song.lyric) {
    return Promise.resolve(song.lyric);
  }
  const mid = song.mid;
  const lyric = lyricMap[mid];
  if (lyric) {
    return Promise.resolve(lyric);
  }

  return get("/api/getLyric", {
    mid,
  }).then((result: any) => {
    const lyric = result ? result.lyric : "[00:00:00]该歌曲暂时无法获取歌词";
    lyricMap[mid] = lyric;
    return lyric;
  });
};
