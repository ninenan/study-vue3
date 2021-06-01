/*
 * @Author: NineNan
 * @Date: 2021-05-24 21:13:08
 * @LastEditTime: 2021-06-01 15:58:10
 * @LastEditors: Please set LastEditors
 * @Description: singer
 * @FilePath: /study_vue03/src/api/singer.ts
 */
import { get } from "@/service/http";
import {
  ISingerDetailsParams,
  ISingerDetailsRes,
} from "@/views/singer/SingerDetails.vue";
// import { ISingerList, ISingerInfo } from "@/types";
/**
 * 获取歌手信息
 * @returns {Promise<T>}
 */
export const getSingerList = <T>(): Promise<T> => {
  return get("/api/getSingerList") as Promise<T>;
};

/**
 * 获取歌手歌单信息
 * @param params {ISingerDetailsParams}
 * @returns {ISingerDetailsRes[]}
 */
export const getSingerDetails = <T>(
  params: ISingerDetailsParams
): Promise<T> => {
  return get("/api/getSingerDetail", params) as Promise<T>;
};
