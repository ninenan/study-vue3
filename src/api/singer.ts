/*
 * @Author: NineNan
 * @Date: 2021-05-24 21:13:08
 * @LastEditTime: 2021-05-24 21:20:00
 * @LastEditors: Please set LastEditors
 * @Description: singer
 * @FilePath: /study_vue03/src/api/singer.ts
 */
import { get } from "@/service/http";
// import { ISingerList, ISingerInfo } from "@/types";
/**
 * 获取歌手信息
 * @returns {Promise<T>}
 */
export const getSingerList = <T>(): Promise<T> => {
  return get("/api/getSingerList") as Promise<T>;
};
