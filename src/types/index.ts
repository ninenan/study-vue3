/*
 * @Author: NineNan
 * @Date: 2021-05-10 13:50:43
 * @LastEditTime: 2021-05-10 21:53:47
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
