/* eslint-disable @typescript-eslint/no-var-requires */
const registerRouter = require("./backend/router");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  productionSourceMap: false,

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

    if (IS_PROD) {
      config.plugin("compression-webpack-plugin").use(BundleAnalyzerPlugin);
    }
  },

  configureWebpack: (config) => {
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },

  devServer: {
    before(app) {
      registerRouter(app);
    },
  },
};
