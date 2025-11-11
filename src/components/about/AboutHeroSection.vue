<template>
  <section class="hero">
    <div class="hero__text">
      <h1>面向创作者的全能 JSON 工具台</h1>
      <p>
        Byte JSON 将格式化、对比、修复与缓存管理合为一体，专为开发者与数据工作者打造。
        在这里，复杂的 JSON 操作变得流畅而优雅。
      </p>
      <div class="hero__actions">
        <button class="app-button app-button--primary" type="button" @click="goWorkspace">
          立即体验
        </button>
        <a class="app-button app-button--secondary" :href="githubUrl" target="_blank" rel="noopener">
          访问 Github
        </a>
      </div>
    </div>
    <div class="hero__preview" aria-label="Byte JSON 工作台功能预览">
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const CTA_GITHUB_URL = 'https://github.com/antfl' as const
const WORKSPACE_ROUTE_NAME = 'workspace'

const router = useRouter()

const githubUrl = CTA_GITHUB_URL

function goWorkspace() {
  router.push({ name: WORKSPACE_ROUTE_NAME })
}
</script>

<style scoped lang="less">
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(32px, 6vw, 48px);
  align-items: stretch;
}

.hero__text h1 {
  font-size: clamp(32px, 6vw, 48px);
  margin-bottom: 16px;
  line-height: 1.15;
  font-weight: 500;
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

.hero__preview {
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-card {
  width: min(100%, 460px);
  border-radius: 24px;
  padding: clamp(22px, 3vw, 28px);
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

:global([data-theme='light'] .preview-pane) {
  background: rgba(248, 250, 252, 0.86);
  border-color: rgba(203, 213, 225, 0.8);
}

:global([data-theme='light'] .preview-pane p) {
  color: rgba(30, 41, 59, 0.78);
}

.preview-pane--right {
  background: rgba(22, 101, 216, 0.22);
  border-color: rgba(59, 130, 246, 0.38);
}

:global([data-theme='light'] .preview-pane--right) {
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

@media (max-width: 768px) {
  .preview-card__body {
    grid-template-columns: 1fr;
  }

  .preview-connector {
    width: 100%;
    height: 4px;
  }
}

@media (max-width: 640px) {
  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero__actions .app-button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}

@media (max-width: 960px) {
  .hero__preview {
    order: -1;
  }
}
</style>


