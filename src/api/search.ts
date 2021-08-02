/*
 * @Author: NineNan
 * @Date: 2021-08-02 23:18:58
 * @LastEditTime: 2021-08-02 23:34:24
 * @LastEditors: Please set LastEditors
 * @Description: search
 * @FilePath: /study_vue03/src/api/search.js
 */

import { get } from "@/service/http";

/**
 * 获取热门搜索
 * @returns
 */
export const getHotKeys = <T>(): Promise<T> => {
  return get("/api/getHotKeys") as Promise<T>;
};
