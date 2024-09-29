import path from 'node:path'

export const CWD = process.cwd()

// Directiory
export const DIST = path.join(CWD, 'dist') // 构建输出目录
export const SRC = path.join(CWD, 'src') // 源代码目录
export const PUBLIC = path.join(CWD, 'public') // 公共资源目录
export const BUILD = path.join(CWD, 'build') // 构建配置目录

// 入口
export const ENTRY = path.join(SRC, 'main.js')

// Dev Server
export const DEV_SERVER_CONFIG = {
  port: 3636,
  liveReload: true,
  compress: false,
  open: true,
}

// 构建优化
export const buildOptimization = {
  deleteComments: true, // 删除代码中注释
  // https://github.com/terser/terser?tab=readme-ov-file#compress-options
  compress: {
    defaults: true, // 默认压缩配置
    drop_console: true, // 去除 console
  }, // 压缩代码
  parallel: false, // 多线程
}

// html-webpack-plugin
export const HTML_TEMPLATE = path.join(PUBLIC, 'index.html')

//Appliction
export const APPLICATION_TITLE = 'Vue 2.6 + Webpack' || process.env.npm_package_name // 应用title

// webpack DLL(默认不启用 使用splitChunks 更好, 如必须使用webpack-merge)
export const DLL_DIR = path.join(BUILD, 'dll/lib') // 动态链接库存放地址
export const DLL_KEY = 'vendor' // 动态链接库入口名
export const DLL_LIBRARY = `_DLL_${DLL_KEY}` // 动态链接库名
export const DLL_LIST = ['vue'] // 需要打包为动态链接库的模块
