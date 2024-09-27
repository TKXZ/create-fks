import prompt from '../instance'
import fs from 'node:fs'
import chalk from 'chalk'
import signale from 'signale'
import { isEmptyDir } from '../utils'
import type { UserCommandRecord } from 'src/types'

const defaultProjectName = 'vue-project'

export async function createProjectDir(data: UserCommandRecord) {
  const { projectName } = data

  if (projectName) {
    return data
  }

  const ans = await prompt<{ projectName: string }>([
    {
      name: 'projectName',
      type: 'input',
      message: '请输入项目名称',
      default: defaultProjectName,
      validate(val) {
        if (val.trim() === '') {
          throw Error('项目名称不能为空')
        } else {
          return true
        }
      },
    },
  ])

  return Object.assign(data, ans)
}

export async function checkProjectDir(data: UserCommandRecord): Promise<UserCommandRecord> {
  const { projectName } = data

  // 检查项目名称是否合法
  if (projectName && !isValidPackageName(projectName)) {
    const { isAutoFixProjectName } = await prompt<{ isAutoFixProjectName: boolean }>([
      {
        name: 'isAutoFixProjectName',
        type: 'confirm',
        message: chalk.red('项目名称不合法，请重新输入,或尝试自动修复?'),
        theme: {
          prefix: '🚨',
        },
      },
    ])

    if (!isAutoFixProjectName) {
      return Promise.reject('项目名称不合法, 用户取消自动修复\n')
    } else {
      data.projectName = toValidPackageName(projectName)
      signale.success(`项目名称已自动修复为: ${chalk.green(data.projectName)}\n`)
    }
  }
  return __checkDir(data)
}

// 校验包名是否合法
function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName)
}
// 转为合法的包名
function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase() // 转小写
    .replace(/\s+/g, '-') // 空格转为连字符
    .replace(/^[._]/, '') // . _ 字符转为空格
    .replace(/[^a-z\d-~]+/g, '-') // 非字母 a-z，非数字，非字符 - ~ 转为连字符
}

async function __checkDir(data: UserCommandRecord): Promise<UserCommandRecord> {
  const { projectName: newProjectName } = data

  // 若项目名称不存在或者目录为空，则直接返回
  if (newProjectName && (!fs.existsSync(newProjectName) || isEmptyDir(newProjectName))) {
    return data
  }
  // 若项目名称存在且目录不为空，则询问是否删除
  const { isNeedDeleteProjectDir } = await prompt<{ isNeedDeleteProjectDir: boolean }>([
    {
      name: 'isNeedDeleteProjectDir',
      type: 'confirm',
      message: '当前目录已存在同名文件夹，是否删除？',
    },
  ])

  if (isNeedDeleteProjectDir && newProjectName) {
    // node rmdirSync 未来版本会移除, 使用 fs.rmSync 代替
    fs.rmSync(newProjectName, { recursive: true, force: true })
  } else {
    throw Error('项目名称冲突')
  }

  return data
}
