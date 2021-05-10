/*
 * @Author: NineNan
 * @Date: 2021-05-10 20:46:56
 * @LastEditTime: 2021-05-10 22:31:18
 * @LastEditors: Please set LastEditors
 * @Description: utils
 * @FilePath: /study_vue03/src/helpers/utils.ts
 */
export const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * 是否是email
 * @param params string
 * @returns boolean
 */
export const isEmail = (params = ""): boolean => {
  return emailReg.test(params);
};

/**
 * 验证是否满足条件
 * @param params Ref<string>
 * @param type string
 * @returns boolean
 */
export const verifyCondition = (params: string, type: string): boolean => {
  switch (type) {
    case "required":
      return params.trim() !== "";
    case "email":
      return isEmail(params);
    default:
      break;
  }
  return true;
};
