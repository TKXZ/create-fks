import prompt from '../instance'
import config from './config'
import { UserCommandRecord, ToolingInfoResult } from 'src/types'

export async function selectTooling(data: UserCommandRecord): Promise<UserCommandRecord> {
  const { vue } = data

  const tooling = await prompt<{ tooling: ToolingInfoResult }>([
    {
      name: 'tooling',
      type: 'list',
      loop: false,
      message: '请选择构建工具',
      choices: config.tooling.map((tool) => {
        if (!vue?.tooling.includes(tool.value.name)) {
          return {
            ...tool,
            disabled: true,
          }
        }
        return tool
      }),
    },
  ])

  return Object.assign(data, tooling)
}
