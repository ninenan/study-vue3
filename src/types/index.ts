/*
 * @Author: NineNan
 * @Date: 2021-05-10 13:50:43
 * @LastEditTime: 2021-07-19 22:59:27
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
  albumInfo: IRecommendAlbums | null;
  rankingInfo: IRankList | null;
}

export interface IMusicStore {
  sequenceList: ISingerDetailsInfo[]; // 播放顺序列表
  playList: ISingerDetailsInfo[]; // 播放列表
  isPlaying: boolean; // 是否播放中
  playMode: PLAY_MODE; // 播放模式
  currentIndex: number; // 当前播放下标
  isFullScreen: boolean; // 是否全屏
  favoritesList: ISingerDetailsInfo[]; // 收藏列表
}

export interface ISingerDetailsInfo {
  album: string;
  duration: number;
  id: number;
  mid: string;
  name: string;
  pic: string;
  singer: string;
  url: string;
  lyric?: string;
  [prop: string]: string | number | undefined;
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

export interface IRankList {
  id: number;
  name: string;
  period: string;
  pic: string;
  songList: {
    id: number;
    singerName: string;
    songName: string;
  }[];
}
