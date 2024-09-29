import Webpack from 'webpack'
import { DIST, ENTRY, SRC } from '../app.config.js'
import { VueLoaderPlugin } from 'vue-loader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * @type {Webpack.Configuration}
 */
const config = {
  entry: {
    main: ENTRY,
  },
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: DIST,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  resolve: {
    // 路径别名, 为了编辑器智能提示还需要更改jsconfig.json 中的paths
    alias: {
      '@': SRC,
    },
    extensions: ['.js', '.mjs', '.ts', '.mts', '.vue', '...'],
  },
  stats: {
    preset: 'minimal',
    errors: true,
    warnings: true,
    colors: true,
    timings: true,
  },
}

export default config
