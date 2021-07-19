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
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/);
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });

    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/assets/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);

    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@hooks", resolve("src/hooks"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@helpers", resolve("src/helpers"))
      .set("@api", resolve("src/api"));
  },

  devServer: {
    before(app) {
      registerRouter(app);
    },
  },
};
