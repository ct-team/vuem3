const buildConfig = require("./build-user/config");
const buildTool = require("./build-user/tool");
const buildCopy = require("./build-user/copy");
// const autoprefixer = require("autoprefixer");
// const pxtoviewport = require("postcss-px-to-viewport");
const IS_PROD = process.env.NODE_ENV === "production";

module.exports = {
    pages: buildTool.getPages(),
    outputDir: "dist",
    assetsDir: "assets",
    // productionSourceMap: false,
    css: {
        extract: IS_PROD,
        sourceMap: false,
        loaderOptions: {
            sass: {
                // 向全局sass样式传入共享的全局变量 （新版本sass-loader的参数改变）
                prependData: `@import "~@/assets/scss/index.scss";`
            },
            less: {
                // // vant自定义主题
                // modifyVars: {
                //     'goods-action-button-danger-color': '#7232dd'
                // }
            },
            postcss: {
                plugins: [
                    // px => rem
                    require("postcss-pxtorem")(buildConfig.px2rem)

                    // px => viewport
                    // autoprefixer(),
                    // pxtoviewport({
                    //     viewportWidth: 375
                    // })
                ]
            }
        }
    },

    // 所有 webpack-dev-server 的选项都支持。
    devServer: buildConfig.devServer,

    // 页面copy
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.plugins.push({
                apply: compilation => {
                    compilation.hooks.done.tap("succeedModule", compilation => {
                        buildCopy.init();
                    });
                }
            });
        }
    },

    pluginOptions: {
        webpackBundleAnalyzer: {
            openAnalyzer: false
        }
    },
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0].BUCheckAppId = buildConfig.checkAppId;
            return args;
        });
    }
};
