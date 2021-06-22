/*
 * @Author: NineNan
 * @Date: 2021-05-11 22:42:52
 * @LastEditTime: 2021-06-22 11:02:47
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

export const SET_PLAYING_STATUE = "SET_PLAYING_STATUE";
export const SET_SEQUENCE_LIST = "SET_SEQUENCE_LIST";
export const SET_PLAYLIST = "SET_PLAYLIST";
export const SET_PLAY_MODE = "SET_PLAY_MODE";
export const SET_CURRENT_INDEX = "SET_CURRENT_INDEX";
export const SET_FULL_SCREEN = "SET_FULL_SCREEN";
export const SET_FAVORITES_LIST = "SET_FAVORITES_LIST";

export const STORAGE = {
  favorites: "__FAVORITES__",
};
