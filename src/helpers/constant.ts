/*
 * @Author: NineNan
 * @Date: 2021-05-11 22:42:52
 * @LastEditTime: 2021-06-05 19:02:03
 * @LastEditors: Please set LastEditors
 * @Description: constant
 * @FilePath: /study_vue03/src/helpers/constant.ts
 */
export const ADD_COUNT = "ADD_COUNT";
export const EDIT_PET = "EDIT_PET";
export const ERR_OK = 0;
export const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://ustbhuangyi.com/music-next/"
    : "/";
export const CACHE_SINGER_INFO = "CACHE_SINGER_INFO";
