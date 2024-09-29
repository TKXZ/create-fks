import Webpack from 'webpack'
import { SRC, DLL_DIR, DLL_KEY } from '../../app.config.js'
import path from 'node:path'

/**
 * @type {Webpack.Configuration}
 */
export default {
  plugins: [
    new Webpack.DllReferencePlugin({
      context: SRC, // 把DLL 应用到哪里? 一般是入口函数的目录下
      manifest: path.join(DLL_DIR, `${DLL_KEY}.manifest.json`),
    }),
  ],
}
