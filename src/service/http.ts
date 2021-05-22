/*
 * @Author: NineNan
 * @Date: 2021-05-22 15:02:04
 * @LastEditTime: 2021-05-22 17:39:40
 * @LastEditors: Please set LastEditors
 * @Description: http.ts
 * @FilePath: /study_vue03/src/service/http.ts
 */

import axios from "axios";
import { ERR_OK, baseURL } from "@/helpers/constant";
import { IResponseData } from "@/types/index";

axios.defaults.baseURL = baseURL;

export const get = <T>(url: string, params?: any): Promise<T | undefined> => {
  return axios
    .get(url, { params })
    .then((response) => {
      const data: IResponseData<T> = response.data;
      if (data.code === ERR_OK) {
        return data.result;
      }
    })
    .catch((error) => {
      console.log("error :>> ", error);
      return undefined;
    });
};
