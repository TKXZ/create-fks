import { init } from './command/init'
import signale from 'signale'

init().catch((err: unknown) => {
  if (err instanceof Error) {
    signale.error(err.message || '未知错误')
  } else {
    signale.error(err)
  }
})
