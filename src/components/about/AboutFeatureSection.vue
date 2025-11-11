<template>
  <section class="features" aria-labelledby="feature-title">
    <h2 id="feature-title">核心能力</h2>
    <div class="feature-grid">
      <article v-for="feature in features" :key="feature.title" class="feature-card">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FeatureCard } from './types'

const featureCards: FeatureCard[] = [
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

const features = computed(() => featureCards)
</script>

<style scoped lang="less">
.features {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.features h2 {
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 500;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: clamp(18px, 4vw, 28px);
}

.feature-card {
  padding: clamp(20px, 3vw, 24px);
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
</style>


