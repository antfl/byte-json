export type PanelKey = 'source' | 'target'

export type ThemeMode = 'dark' | 'light'

export type ToolAction =
  `${PanelKey}-${'import' | 'export' | 'format' | 'minify' | 'repair' | 'clear'}`

export type MessageLevel = 'success' | 'error' | 'info'

export type DiffState = {
  ok: boolean
  hasDiff: boolean
  message: string
}

