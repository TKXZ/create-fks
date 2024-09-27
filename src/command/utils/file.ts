import fs from 'node:fs'
import path from 'node:path'

export function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true })
  for (const file of fs.readdirSync(src)) {
    const srcFile = path.join(src, file)
    const destFile = path.join(dest, file)
    copy(srcFile, destFile)
  }
}

export function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

export function write(dest: string, templateDir: string, file: string, content?: string) {
  const destPath = path.join(dest, file)
  if (!content) {
    copy(path.join(templateDir, file), destPath)
  } else {
    fs.writeFileSync(destPath, content)
  }
}
