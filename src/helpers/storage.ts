/*
 * @Author: NineNan
 * @Date: 2021-06-22 10:02:28
 * @LastEditTime: 2021-06-22 21:30:30
 * @LastEditors: Please set LastEditors
 * @Description: storage 关于本地storage的操作
 * @FilePath: \study-vue3\src\helpers\storage.ts
 */

type Compare<T> = (value: T, index?: number, obj?: T[]) => boolean;

/**
 * 保存收藏歌曲到本地
 * @param item T
 * @param key string
 * @param compare Compare<T>
 * @param maxLength number
 * @returns T[]
 */
export const save = <T>(
  item: T,
  key: string,
  compare: Compare<T>,
  maxLength?: number
): T[] => {
  let items: T[] = [];
  if (localStorage.getItem(key)) {
    items = JSON.parse(localStorage.getItem(key) as string);
  }
  inertArray<T>(items, item, compare, maxLength);
  localStorage.setItem(key, JSON.stringify(items));
  return items;
};

/**
 * 处理数据
 * @param arr T[]
 * @param val T
 * @param compare Compare<T>
 * @param maxLength number
 * @returns T[]
 */
function inertArray<T>(
  arr: T[],
  val: T,
  compare: Compare<T>,
  maxLength?: number
) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);
  if (maxLength && maxLength < arr.length) {
    arr.pop();
  }
}

export const remove = <T>(key: string, compare: Compare<T>): T[] => {
  const items: T[] = JSON.parse(localStorage.getItem(key) as string) || [];
  removeArray(items, compare);
  localStorage.setItem(key, JSON.stringify(items));
  return items;
};

function removeArray<T>(arr: T[], compare: Compare<T>): void {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export const load = (key: string): [] => {
  return JSON.parse(localStorage.getItem(key) as string) || [];
};
