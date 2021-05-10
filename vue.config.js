/*
 * @Author: NineNan
 * @Date: 2021-05-06 22:11:36
 * @LastEditTime: 2021-05-10 16:14:58
 * @LastEditors: Please set LastEditors
 * @Description: 配置文件
 * @FilePath: /study_vue03/vue.config.js
 */
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      sass: {
        implementation: require("sass"), // This line must in sass option
        additionalData: `
          @import "@assets/style/common.scss";
          @import "@assets/style/variable.scss";
          @import "@assets/style/transition.scss";
        `,
      },
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@hooks", resolve("src/hooks"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@helpers", resolve("src/helpers"));
  },
};
