/*
 * @Author: NineNan
 * @Date: 2021-05-22 15:19:19
 * @LastEditTime: 2021-05-22 17:40:14
 * @LastEditors: Please set LastEditors
 * @Description: 轮播图
 * @FilePath: /study_vue03/src/api/rcommend.ts
 */
import { get } from "@/service/http";
// import { IResponseData } from "@/types/index";
/**
 * @description 获取轮播图
 * @returns
 */
export const getRecommend = <T>(): Promise<T> => {
  return get<T>("/api/getRecommend") as Promise<T>;
};
