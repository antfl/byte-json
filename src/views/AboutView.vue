<script setup lang="ts">
import { useRouter } from 'vue-router'
import Logo from '../assets/logo.svg'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDarkTheme, toggleTheme, themeToggleTitle } = useTheme()

const featureCards = [
  {
    title: '智能格式化',
    description: '一键整理 JSON 结构，自动对齐缩进与键值，让数据清晰可读。'
  },
  {
    title: '高精度对比',
    description: '采用高级 diff 算法精准识别差异，支持左右联动追踪每一次变化。'
  },
  {
    title: '快速修复',
    description: '内置 jsonrepair 引擎，遇到缺失逗号、引号等语法问题也能自动修补。'
  },
  {
    title: '灵活导入导出',
    description: '支持剪贴板、文件、本地缓存多种方式，方便在不同场景间切换。'
  }
]

const highlights = [
  {
    label: '沉浸式体验',
    value: '深浅色主题自适应，界面与代码风格同步切换'
  },
  {
    label: '开发者友好',
    value: 'Monaco 编辑器加持，支持自动换行、语法高亮与快捷键'
  },
  {
    label: '数据安全',
    value: '所有操作均在本地浏览器完成，无需担心数据泄露'
  }
]

function goWorkspace() {
  router.push({ name: 'workspace' })
}
</script>

<template>
  <div class="about-page">
    <header class="about-header">
      <div class="brand">
        <span class="brand__logo-wrapper">
          <img class="brand__logo" :src="Logo" alt="Byte JSON 标志" />
        </span>
        <span class="brand__mark">Byte</span>
        <span class="brand__name">JSON</span>
      </div>
      <div class="header-actions">
        <button
          class="theme-toggle"
          type="button"
          :title="themeToggleTitle"
          :aria-label="themeToggleTitle"
          @click="toggleTheme"
        >
          <span class="theme-toggle__icon" :class="{ 'is-dark': isDarkTheme }" />
        </button>
        <button class="cta-button" type="button" @click="goWorkspace">
          立即体验
        </button>
      </div>
    </header>

    <main class="about-content">
      <section class="hero">
        <div class="hero__text">
          <h1>面向创作者的全能 JSON 工具台</h1>
          <p>
            Byte JSON 将格式化、对比、修复与缓存管理合为一体，专为开发者与数据工作者打造。
            在这里，复杂的 JSON 操作变得流畅而优雅。
          </p>
          <div class="hero__actions">
            <button class="primary-button" type="button" @click="goWorkspace">
              立即体验
            </button>
            <a
              class="secondary-link"
              href="https://github.com/antfl"
              target="_blank"
              rel="noopener"
            >
              查看项目路线图
            </a>
          </div>
        </div>
        <div class="hero__preview">
          <div class="preview-card">
            <div class="preview-card__header">
              <span class="preview-badge">工作台速览</span>
              <span class="preview-title">实时对比 &amp; 预览</span>
            </div>
            <div class="preview-card__body">
              <div class="preview-pane preview-pane--left">
                <h3>源 JSON</h3>
                <p>
                  支持快速导入、格式化与压缩，随时切换展示模式。
                </p>
              </div>
              <div class="preview-connector" aria-hidden="true" />
              <div class="preview-pane preview-pane--right">
                <h3>预览/差异</h3>
                <p>
                  高亮展示结构变化，帮助你聚焦真正重要的内容。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="features">
        <h2>核心能力</h2>
        <div class="feature-grid">
          <article v-for="feature in featureCards" :key="feature.title" class="feature-card">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </article>
        </div>
      </section>

      <section class="highlights">
        <h2>为什么选择 Byte JSON</h2>
        <div class="highlight-list">
          <div v-for="item in highlights" :key="item.label" class="highlight-item">
            <span class="highlight-label">{{ item.label }}</span>
            <span class="highlight-value">{{ item.value }}</span>
          </div>
        </div>
      </section>
    </main>

    <footer class="about-footer">
      <div class="footer-info">
        <span class="footer-tagline">Byte JSON · 让结构化数据处理更简单</span>
        <div class="footer-icp">
          <span>ICP备案：渝ICP备2025064146号</span>
          <span class="footer-separator">·</span>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">工信部备案查询</a>
        </div>
      </div>
      <button class="cta-link" type="button" @click="goWorkspace">立即体验</button>
    </footer>
  </div>
</template>

<style scoped lang="less">
.about-page {
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 40px clamp(24px, 4vw, 64px);
  color: var(--text-primary);
  background: radial-gradient(120% 140% at 10% 10%, rgba(77, 107, 255, 0.32), transparent),
    radial-gradient(120% 140% at 90% 20%, rgba(16, 185, 129, 0.24), transparent),
    var(--app-gradient-start);
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

.about-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: clamp(32px, 6vw, 60px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 600;

  &__logo-wrapper {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: rgba(148, 163, 184, 0.18);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.22);
  }

  &__logo {
    width: 26px;
    height: 26px;
  }

  &__mark {
    padding: 6px 12px;
    border-radius: 12px;
    background: rgba(77, 107, 255, 0.16);
    backdrop-filter: blur(8px);
  }

  &__name {
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
  background: var(--surface-secondary);
  color: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--border-strong);
    transform: translateY(-1px);
  }
}

.theme-toggle__icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #facc15, #f97316);
  position: relative;
  transition: all 0.26s ease;

  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: #0f172a;
    opacity: 0;
    transform: scale(0.6);
    transition: all 0.26s ease;
  }

  &.is-dark::after {
    opacity: 1;
    transform: scale(1);
  }
}

.cta-button,
.primary-button {
  padding: 10px 24px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #4d6bff, #6f8dff);
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(77, 107, 255, 0.35);
  }
}

.cta-button {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

.about-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 8vw, 72px);
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(32px, 6vw, 48px);
  align-items: stretch;
}

.hero__text h1 {
  font-size: clamp(32px, 6vw, 48px);
  margin-bottom: 16px;
  line-height: 1.15;
}

.hero__text p {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 24px;
  color: var(--text-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
}

.secondary-link {
  color: var(--color-brand);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 1px;
    background: currentColor;
    opacity: 0.4;
    transition: opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
  }
}

.hero__preview {
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-card {
  width: min(100%, 460px);
  border-radius: 24px;
  padding: 28px;
  background: linear-gradient(145deg, rgba(148, 163, 184, 0.12), transparent), var(--surface-primary);
  border: 1px solid rgba(148, 163, 184, 0.28);
  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
  backdrop-filter: blur(12px);
}

.preview-card__header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.preview-badge {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.18);
  align-self: flex-start;
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
}

.preview-card__body {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: center;
}

.preview-pane {
  padding: 18px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.32);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(148, 163, 184, 0.22);
  min-height: 150px;

  h3 {
    margin: 0 0 12px;
    font-size: 16px;
  }

  p {
    margin: 0;
    color: rgba(226, 232, 240, 0.86);
    line-height: 1.6;
    font-size: 14px;
  }
}

[data-theme='light'] .preview-pane {
  background: rgba(248, 250, 252, 0.86);
  border-color: rgba(203, 213, 225, 0.8);

  p {
    color: rgba(30, 41, 59, 0.78);
  }
}

.preview-pane--right {
  background: rgba(22, 101, 216, 0.22);
  border-color: rgba(59, 130, 246, 0.38);
}

[data-theme='light'] .preview-pane--right {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(37, 99, 235, 0.32);
}

.preview-connector {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.48), rgba(16, 185, 129, 0.48));
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.38);
}

.features {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.features h2,
.highlights h2 {
  font-size: clamp(24px, 5vw, 32px);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(18px, 4vw, 28px);
}

.feature-card {
  padding: 24px;
  border-radius: 20px;
  background: var(--surface-secondary);
  border: 1px solid var(--border-subtle);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  h3 {
    margin: 0 0 12px;
    font-size: 18px;
  }

  p {
    margin: 0;
    color: var(--text-muted);
    line-height: 1.6;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.24);
  }
}

.highlights {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.highlight-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.highlight-item {
  padding: 22px 24px;
  border-radius: 18px;
  border: 1px solid var(--border-subtle);
  background: rgba(15, 23, 42, 0.18);
  backdrop-filter: blur(6px);

  .highlight-label {
    font-size: 13px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.65;
  }

  .highlight-value {
    display: block;
    margin-top: 12px;
    font-size: 16px;
    line-height: 1.6;
  }
}

[data-theme='light'] .highlight-item {
  background: rgba(226, 232, 240, 0.5);
}

.about-footer {
  margin-top: clamp(48px, 8vw, 72px);
  padding-top: 24px;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  color: var(--text-muted);
}

.footer-info {
  display: grid;
  gap: 6px;
}

.footer-tagline {
  font-size: 14px;
}

.footer-icp {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.footer-icp a {
  color: var(--color-brand);
  text-decoration: none;
}

.footer-icp a:hover {
  text-decoration: underline;
}

.footer-separator {
  color: rgba(148, 163, 184, 0.6);
}

.cta-link {
  border: none;
  background: transparent;
  color: var(--color-brand);
  font-weight: 600;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 -3px 0;
    height: 2px;
    background: currentColor;
    opacity: 0;
    transform: scaleX(0.7);
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: scaleX(1);
  }
}

@media (max-width: 960px) {
  .about-page {
    padding: 28px 20px 40px;
  }

  .about-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .hero__preview {
    order: -1;
  }

  .preview-card {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }

  .theme-toggle {
    align-self: flex-start;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-button,
  .secondary-link {
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  .preview-card__body {
    grid-template-columns: 1fr;
  }

  .preview-connector {
    width: 100%;
    height: 4px;
  }

  .about-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>

