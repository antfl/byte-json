const THEME_COLOR = '#4d6bff'

/**
 * 在控制台显示品牌信息
 */
export function showBrandInfo() {
  const brandStyle = [
    'font-size: 24px',
    'font-weight: bold',
    `background: linear-gradient(135deg, ${THEME_COLOR} 0%, #3b52e0 100%)`,
    'color: white',
    'padding: 16px 32px',
    'border-radius: 10px',
    'text-shadow: 2px 2px 4px rgba(0,0,0,0.3)',
    'box-shadow: 0 6px 12px rgba(0,0,0,0.15)',
    'letter-spacing: 2px',
    'display: inline-block',
    'margin-bottom: 8px'
  ].join(';')

  const subtitleStyle = [
    'font-size: 16px',
    `color: ${THEME_COLOR}`,
    'font-style: italic',
    'font-weight: 500',
    'margin-top: 8px',
    'display: block'
  ].join(';')

  console.log('%c字节流光 Byteout', brandStyle)
  console.log('%c重构未来的底色', subtitleStyle)
  console.log(
    '%c感谢使用字节流光 Byteout - 专业的 JSON 工具',
    'font-size: 12px; color: #94a3b8; margin-top: 4px;'
  )
}

