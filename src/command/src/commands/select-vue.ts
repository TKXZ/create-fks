import type { UserCommandRecord, VueInfoResult } from 'src/types'
import prompt from '../instance'
import config from './config'

export async function selectVue(data: UserCommandRecord): Promise<UserCommandRecord> {
  const vue = await prompt<{ vue: VueInfoResult }>([
    {
      name: 'vue',
      type: 'list',
      loop: false,
      message: '请选择 Vue 版本',
      choices: config.vue,
    },
  ])

  return Object.assign(data, vue)
}
