import prompt from '../instance'
import { execSync } from 'child_process'

export async function autoInstallDeps(shell: Array<string>) {
  const { isAutoInstallDeps } = await prompt<{ isAutoInstallDeps: boolean }>([
    {
      name: 'isAutoInstallDeps',
      message: '是否安装依赖?',
      type: 'confirm',
      default: false,
      theme: {
        spinner: {
          interval: 10,
        },
      },
    },
  ])

  if (isAutoInstallDeps) {
    execSync(shell.join(' && '), { stdio: 'inherit' })
    return true
  }
  return false
}
