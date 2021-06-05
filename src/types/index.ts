/*
 * @Author: NineNan
 * @Date: 2021-05-10 13:50:43
 * @LastEditTime: 2021-06-05 19:08:01
 * @LastEditors: Please set LastEditors
 * @Description: types
 * @FilePath: \study-vue3\src\types\index.ts
 */
export interface IEnv {
  BASE_URL: string;
  NODE_ENV: string;
}

export type RulesType = "required" | "email";

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
}

export interface ISingerStore {
  singerInfo: ISingerInfo | null;
}

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
