/*
 * @Author: NineNan
 * @Date: 2021-05-10 13:50:43
 * @LastEditTime: 2021-05-12 14:38:41
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
}
