/*
 * @Author: NineNan
 * @Date: 2021-07-19 21:31:39
 * @LastEditTime: 2021-07-19 22:52:22
 * @LastEditors: Please set LastEditors
 * @Description: topList
 * @FilePath: /study_vue03/src/api/topList.ts
 */

import { get } from "@/service/http";
import { IRankList } from "@/types/index";
/**
 * 获取排行榜
 */
export const getTopList = <T>(): Promise<T> => {
  return get("/api/getTopList") as Promise<T>;
};

/**
 * 获取排行榜详情
 * @param {IRankList} top
 * @returns
 */
export const getTopDetail = <T>(top: {
  id: string;
  period: string;
}): Promise<T> => {
  return get("/api/getTopDetail", {
    id: top.id,
    period: top.period,
  }) as Promise<T>;
};
