const SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB']

export function formatByteSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B'
  }
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), SIZE_UNITS.length - 1)
  const value = bytes / 1024 ** exponent
  return `${value >= 100 ? value.toFixed(0) : value >= 10 ? value.toFixed(1) : value.toFixed(2)} ${
    SIZE_UNITS[exponent]
  }`
}

export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mi = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
}

export interface JsonParseError {
  line: number
  column: number
  message: string
  position: number
  errorChar?: string
}

export function parseJsonError(error: unknown, source: string): JsonParseError | null {
  if (!(error instanceof SyntaxError)) {
    return null
  }

  const errorMessage = error.message
  const lines = source.split('\n')
  
  // 尝试从错误消息中提取位置信息
  // JSON.parse 的错误消息格式通常是: "Unexpected token X in JSON at position Y"
  const positionMatch = errorMessage.match(/position\s+(\d+)/i)
  if (positionMatch && positionMatch[1]) {
    const position = parseInt(positionMatch[1], 10)
    let currentPos = 0
    let line = 1
    let column = 1
    
    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i] ?? ''
      const lineLength = currentLine.length
      const lineStart = currentPos
      const lineEnd = currentPos + lineLength
      
      // 检查错误位置是否在当前行内（包括行尾）
      if (position >= lineStart && position <= lineEnd) {
        line = i + 1
        // 列号从1开始，所以是 position - lineStart + 1
        // 但如果位置在行尾之后（换行符位置），则指向行尾
        column = Math.min(position - lineStart + 1, lineLength + 1)
        break
      }
      
      // 移动到下一行（当前行长度 + 换行符）
      currentPos += lineLength + 1
    }
    
    // 如果错误位置超出所有行，指向最后一行
    if (line === 1 && position >= currentPos) {
      const lastLineIndex = lines.length - 1
      if (lastLineIndex >= 0) {
        line = lines.length
        const lastLine = lines[lastLineIndex] ?? ''
        column = lastLine.length + 1
      }
    }
    
    // 获取错误位置的字符
    const errorChar = source[position] || ''
    
    // 清理错误消息，使其更友好
    let friendlyMessage = errorMessage
      .replace(/JSON\.parse:/gi, '')
      .replace(/at position \d+/gi, '')
      .trim()
    
    // 常见错误类型的友好提示
    if (errorMessage.includes('Unexpected end')) {
      friendlyMessage = 'JSON 字符串意外结束，可能缺少闭合括号或引号'
    } else if (errorMessage.includes('Unexpected token')) {
      const tokenMatch = errorMessage.match(/Unexpected token\s+([^\s]+)/i)
      if (tokenMatch) {
        friendlyMessage = `发现意外的字符: ${tokenMatch[1]}`
      } else {
        friendlyMessage = `发现意外的字符: ${errorChar || '未知'}`
      }
    } else if (errorMessage.includes('Expected')) {
      friendlyMessage = '缺少预期的字符'
    } else if (errorMessage.includes('Unterminated string')) {
      friendlyMessage = '字符串未正确闭合，请检查引号'
    }
    
    return {
      line,
      column,
      message: friendlyMessage,
      position,
      errorChar: errorChar || undefined
    }
  }
  
  // 如果无法提取位置，尝试从消息中提取行号
  const lineMatch = errorMessage.match(/line\s+(\d+)/i)
  if (lineMatch && lineMatch[1]) {
    const line = parseInt(lineMatch[1], 10)
    return {
      line,
      column: 1,
      message: errorMessage.replace(/JSON\.parse:/gi, '').trim(),
      position: 0
    }
  }
  
  return {
    line: 1,
    column: 1,
    message: errorMessage.replace(/JSON\.parse:/gi, '').trim(),
    position: 0
  }
}

