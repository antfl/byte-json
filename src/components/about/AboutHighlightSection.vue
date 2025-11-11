<template>
  <section class="highlights" aria-labelledby="highlight-title">
    <h2 id="highlight-title">为什么选择 Byte JSON</h2>
    <div class="highlight-list">
      <article v-for="item in highlightItems" :key="item.label" class="feature-card highlight-card">
        <span class="highlight-label">{{ item.label }}</span>
        <span class="highlight-value">{{ item.value }}</span>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HighlightItem } from './types'

const highlightList: HighlightItem[] = [
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

const highlightItems = computed(() => highlightList)
</script>

<style scoped lang="less">
.highlights {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.highlights h2 {
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 500;
}

.highlight-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.feature-card {
  padding: clamp(20px, 3vw, 24px);
  border-radius: 20px;
  background: var(--surface-secondary);
  border: 1px solid var(--border-subtle);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.highlight-card {
  padding: clamp(20px, 3vw, 24px);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .highlight-label {
    font-size: 13px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.65;
  }

  .highlight-value {
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-muted);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 32px rgba(15, 23, 42, 0.24);
  }
}

@media (max-width: 480px) {
  .highlight-card {
    padding: 18px 20px;
  }
}
</style>


