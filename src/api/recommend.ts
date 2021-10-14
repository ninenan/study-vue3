/*
 * @Author: NineNan
 * @Date: 2021-05-22 15:19:19
 * @LastEditTime: 2021-07-17 23:40:38
 * @LastEditors: Please set LastEditors
 * @Description: 轮播图
 * @FilePath: /study_vue03/src/api/rcommend.ts
 */
import { get } from "@/service/http";

/**
 * @description 获取轮播图
 * @returns
 */
export const getRecommend = <T>(): Promise<T> => {
  return get<T>("/api/getRecommend") as Promise<T>;
};

/**
 * 获取专辑详情
 */
export const getAlbumDetail = <T>(album: { id: string }): Promise<T> => {
  return get("/api/getAlbum", {
    id: album.id,
  }) as Promise<T>;
};
