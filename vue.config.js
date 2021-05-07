/*
 * @Author: NineNan
 * @Date: 2021-05-06 22:11:36
 * @LastEditTime: 2021-05-06 22:14:23
 * @LastEditors: Please set LastEditors
 * @Description: 配置文件
 * @FilePath: /study_vue03/vue.config.js
 */
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"), // This line must in sass option
      },
    },
  },
};
