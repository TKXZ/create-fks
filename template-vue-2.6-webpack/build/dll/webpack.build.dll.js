import Webpack from 'webpack'
import { DLL_DIR, DLL_KEY, DLL_LIST, DLL_LIBRARY } from '../../app.config.js'
import path from 'node:path'

/**
 * @type {Webpack.Configuration}
 */
const dllConfig = {
  entry: {
    [DLL_KEY]: DLL_LIST,
  },
  output: {
    filename: '[name].dll.js',
    path: DLL_DIR,
    library: DLL_LIBRARY, // 与打包出的dll 文件相关联
    clean: true,
  },
  plugins: [
    new Webpack.DllPlugin({
      name: DLL_LIBRARY, // 和哪个库相关联
      path: path.join(DLL_DIR, '[name].manifest.json'),
    }),
  ],
}

export default dllConfig
