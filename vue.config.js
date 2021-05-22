/* eslint-disable @typescript-eslint/no-var-requires */
const registerRouter = require("./backend/router");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
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
          @import "@assets/style/variable.scss";
          @import "@assets/style/mixin.scss";
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

  devServer: {
    before(app) {
      registerRouter(app);
    },
  },
};
