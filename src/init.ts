import minimist from 'minimist'
import path from 'node:path'
import fs from 'node:fs'
import * as commander from './command/src/commands'
import { fileURLToPath } from 'node:url'
import { UserCommandResult } from 'src/types'
import { isEmptyDir } from './command/src/utils'
import { write } from './utils/file'
import ora from 'ora'
import { autoInstallDeps } from './command/src/commands/auto-install-dep'

const spinner = ora()

const cwd = process.cwd()

const argv = minimist<{
  help?: boolean
}>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: 'help' },
  string: ['_'],
})

export async function init() {
  // 获取命令行中用户直接输入的文件夹名
  let projectNameFromArgv = formatProjectDir(argv._[0])

  const userData = { projectName: projectNameFromArgv }

  // 创建项目文件夹
  await commander.createProjectDir(userData)
  // 检查文件夹名合法性与文件夹内容
  await commander.checkProjectDir(userData)
  // 选择Vue 版本
  await commander.selectVue(userData)
  // 选择构建工具
  await commander.selectTooling(userData)

  const { projectName, vue, tooling } = userData as UserCommandResult

  const root = path.join(cwd, projectName)

  if (isEmptyDir(root)) {
    fs.mkdirSync(root, { recursive: true })
  } else {
    throw Error('创建项目失败, 目标目录不为空')
  }

  // 目标模板存放地址
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../',
    `template-${vue?.templateField}-${tooling?.templateField}`,
  )

  // 复刻模板
  spinner.text = '获取项目到 ' + projectName + ' 文件夹中\n'
  spinner.prefixText = '🚀 '
  spinner.start()
  for (const file of fs.readdirSync(templateDir)) {
    if (file !== 'package.json' && file !== 'node_modules') {
      write(root, templateDir, file)
    }
  }

  // 复写 package.json name
  const templatePackageJson = fs
    .readFileSync(path.join(templateDir, 'package.json'))
    .toString('utf-8')

  const packageData = JSON.parse(templatePackageJson)
  packageData.name = projectName

  write(root, templateDir, 'package.json', JSON.stringify(packageData, null, 2) + '\n')
  spinner.stop()

  console.log(`
    🎉 创建完成!
    `)

  // 自动安装依赖
  const isInstall = await autoInstallDeps([`cd ${projectName}`, 'npm install'])
  if (isInstall) {
    console.log(`
    🎉 全部已完成！
    cd ${projectName}
    npm run dev
    `)
  } else {
    console.log(`
    🎉 全部已完成！
    cd ${projectName}
    npm / pnpm / yarn install
    npm run dev
    `)
  }
}

// 格式化项目名称 去除空白和 / 因为可能出现路径
function formatProjectDir(dirName?: string) {
  return dirName?.trim().replace(/\/+$/, '')
}
