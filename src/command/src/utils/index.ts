import fs from 'node:fs'

/**
 * 检查是否是空目录
 * @param dir 目标目录
 * @returns
 */
export function isEmptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return true
  }

  const files = fs.readdirSync(dir)
  if (files.length === 0) {
    return true
  }
  return false
}

export function write(target: string, file: string, content?: string) {
  if (content) {
  }
}
