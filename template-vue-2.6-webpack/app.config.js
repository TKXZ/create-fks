import path from 'node:path'

export const CWD = process.cwd()

// Directiory
export const DIST = path.join(CWD, 'dist')
export const SRC = path.join(CWD, 'src')
export const PUBLIC = path.join(CWD, 'public')
export const BUILD = path.join(CWD, 'build')

// 入口
export const ENTRY = path.join(SRC, 'main.js')

// Dev Server
export const DEV_SERVER_CONFIG = {
  port: 3636,
  hot: true,
  compress: true,
  open: true,
}

// html-webpack-plugin
export const HTML_TEMPLATE = path.join(PUBLIC, 'index.html')

//Appliction
export const APPLICATION_TITLE = 'Vue 2.6 + Webpack' || process.env.npm_package_name

// webpack DLL(默认不启用 使用splitChunks 更好, 如必须使用webpack-merge)
export const DLL_DIR = path.join(BUILD, 'dll/lib') // 动态链接库存放地址
export const DLL_KEY = 'vendor' // 动态链接库入口名
export const DLL_LIBRARY = `_DLL_${DLL_KEY}` // 动态链接库名
export const DLL_LIST = ['vue'] // 需要打包为动态链接库的模块
