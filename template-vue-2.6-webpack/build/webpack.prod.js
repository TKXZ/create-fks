import Webpack from 'webpack'
import { merge } from 'webpack-merge'
import CommonConfig from './webpack.common.js'
import { HTML_TEMPLATE, APPLICATION_TITLE } from '../app.config.js'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

/**
 * @type { Webpack.Configuration }
 */
const prodConfig = merge(CommonConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'index.html',
      title: APPLICATION_TITLE,
      chunks: ['main', 'vue', 'common'],
    }),
    new Webpack.DllPlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vue: {
          name: 'vue',
          test: /[\\/]node_modules[\\/]vue/,
          priority: 9,
          minSize: 0,
          minChunks: 1,
        },
        common: {
          name: 'common',
          test: /[\\/]node_modules/,
          priority: 1,
          minChunks: 3,
        },
      },
    },
  },
})

export default prodConfig
