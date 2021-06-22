/*
 * @Author: NineNan
 * @Date: 2021-05-10 20:46:56
 * @LastEditTime: 2021-06-22 14:59:28
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

/**
 * 数字格式化
 * @param num {number}
 * @returns {string}
 */
export const digitalFormatting = (num: number): string => {
  return num.toString().indexOf(".") !== -1
    ? num.toLocaleString()
    : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};

/**
 * 洗牌数组
 * @param source unknown[]
 * @returns unknown[]
 */
export const shuffle = (source: unknown[]): unknown[] => {
  const arr = source.slice();
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i);
    swap(arr, i, j);
  }
  return arr;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

function swap(arr: unknown[], i: number, j: number) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

/**
 * 格式化时间
 * @param time number
 */
export const formatTime = (time: number) => {
  time = time | 0;

  const minute: string = (((time / 60) | 0) + "").padStart(2, "0");
  const second: string = ((time % 60 | 0) + "").padStart(2, "0");

  return `${minute}:${second}`;
};
