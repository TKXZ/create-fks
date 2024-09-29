import Webpack from 'webpack'
import path from 'node:path'
import { merge } from 'webpack-merge'
import { CWD, DEV_SERVER_CONFIG, HTML_TEMPLATE, APPLICATION_TITLE, DIST } from '../app.config.js'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CommonConfig from './webpack.common.js'

/**
 * @type { Webpack.Configuration}
 */
const devConfig = merge(CommonConfig, {
  mode: 'development',
  cache: {
    type: 'filesystem',
    cacheDirectory: path.join(CWD, '.temp_cache'),
    maxAge: 1000 * 3600 * 24 * 7, // 一周
  },
  devServer: { ...DEV_SERVER_CONFIG },
  plugins: [
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE,
      filename: 'index.html',
      title: APPLICATION_TITLE,
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
})

export default devConfig
