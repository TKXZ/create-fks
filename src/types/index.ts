type Tooling = 'webpack' | 'vite'

export type VueInfoResult = {
  pkg_version: string
  templateField: string
  tooling: Tooling
}

export type ToolingInfoResult = {
  templateField: string
}

export type UserCommandResult = {
  projectName: string
  vue: VueInfoResult
  tooling: ToolingInfoResult
}
export type UserCommandRecord = Partial<UserCommandResult>
