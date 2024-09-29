import Webpack from 'webpack'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import { merge } from 'webpack-merge'
import CommonConfig from './webpack.common.js'
import { HTML_TEMPLATE, APPLICATION_TITLE, buildOptimization } from '../app.config.js'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

/**
 * @type { Webpack.Configuration }
 */
const prodConfig = merge(CommonConfig, {
  mode: 'production',
  output: {
    compareBeforeEmit: false,
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'index.html',
      title: APPLICATION_TITLE,
      chunks: ['main', 'vue', 'common'],
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /[\\/]node_modules][\\/](.*)\.(m)?js$/,
        parallel: buildOptimization.parallel ?? true,
        terserOptions: {
          compress: buildOptimization.compress,
          format: {
            comments: buildOptimization.deleteComments ?? true,
          },
        },
      }),
    ],
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
