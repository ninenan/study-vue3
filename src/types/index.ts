/*
 * @Author: NineNan
 * @Date: 2021-05-10 13:50:43
 * @LastEditTime: 2021-06-06 20:07:11
 * @LastEditors: Please set LastEditors
 * @Description: types
 * @FilePath: \study-vue3\src\types\index.ts
 */
export interface IEnv {
  BASE_URL: string;
  NODE_ENV: string;
}

export type RulesType = "required" | "email";

// 播放顺序
export enum PLAY_MODE {
  sequence,
  loop,
  random,
}
export interface IRules {
  type: RulesType;
  message: string;
}

export interface IRouterLink {
  name: string;
  path: string;
}

export interface IUser {
  name: string;
  height: number;
  address: string;
  pet: string[];
  isLogin: boolean;
  id: number;
}

export interface ITestSore {
  count: number;
}

export interface IStore {
  test: ITestSore;
  user: IUser;
  singer: ISingerStore;
  music: IMusicStore;
}

export interface ISingerStore {
  singerInfo: ISingerInfo | null;
}

export interface IMusicStore {
  sequenceList: unknown[]; // 播放顺序列表
  playList: unknown[]; // 播放列表
  isPlaying: boolean; // 是否播放中
  playMode: PLAY_MODE; // 播放模式
  currentIndex: number; // 当前播放下标
  isFullScreen: boolean; // 是否全屏
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IResponseData<T = any> {
  code: number;
  result: T;
}

export interface IRecommendSliders {
  id: string;
  link: string;
  pic: string;
}

export interface IRecommendAlbums {
  id: number;
  pic: string;
  title: string;
  username: string;
}

export interface IRecommend {
  albums: IRecommendAlbums[];
  sliders: IRecommendSliders[];
}

export interface ISingerInfo {
  id: number;
  mid: string;
  name: string;
  pic: string;
}

export interface ISingerList {
  list: ISingerInfo[];
  title: string;
}
