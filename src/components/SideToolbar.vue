<script setup lang="ts">
import { computed } from 'vue'
import IconButton from './IconButton.vue'

const props = defineProps<{
  mode: 'format' | 'diff'
  themeToggleTitle: string
  isDarkTheme: boolean
}>()

const emit = defineEmits<{
  (e: 'update:mode', mode: 'format' | 'diff'): void
  (e: 'toggleTheme'): void
}>()

const isFormatMode = computed(() => props.mode === 'format')
</script>

<template>
  <aside class="side-toolbar">
    <div class="toolbar-section">
      <div class="mode-switch">
        <IconButton
          icon="format"
          :variant="isFormatMode ? 'primary' : 'ghost'"
          :active="isFormatMode"
          title="JSON 预览模式"
          @click="emit('update:mode', 'format')"
        />
        <IconButton
          icon="diff"
          :variant="!isFormatMode ? 'primary' : 'ghost'"
          :active="!isFormatMode"
          title="对比"
          @click="emit('update:mode', 'diff')"
        />
      </div>

      <button
        type="button"
        class="theme-toggle"
        :title="themeToggleTitle"
        :aria-label="themeToggleTitle"
        @click="emit('toggleTheme')"
      >
        <svg v-if="isDarkTheme" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M20 15.5A8 8 0 1 1 12.5 4c-.33.75-.5 1.57-.5 2.41A6.09 6.09 0 0 0 18.09 12c.84 0 1.66-.17 2.41-.5z"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="4.5" />
          <line x1="12" y1="2.5" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="21.5" />
          <line x1="4.5" y1="12" x2="7" y2="12" />
          <line x1="17" y1="12" x2="19.5" y2="12" />
          <line x1="5.8" y1="5.8" x2="7.6" y2="7.6" />
          <line x1="16.4" y1="16.4" x2="18.2" y2="18.2" />
          <line x1="5.8" y1="18.2" x2="7.6" y2="16.4" />
          <line x1="16.4" y1="7.6" x2="18.2" y2="5.8" />
        </svg>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.side-toolbar {
  width: var(--sidebar-width);
  padding: 6px 4px;
  background: var(--surface-toolbar);
  border-right: 1px solid var(--border-subtle);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  box-shadow: var(--shadow-toolbar);
}

.toolbar-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.mode-switch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.side-toolbar :deep(.icon-button) {
  width: 28px;
  height: 28px;
  border-radius: 10px;
}

.theme-toggle {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid var(--border-button);
  background: var(--surface-card);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-strong);
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.theme-toggle:hover {
  border-color: var(--color-brand);
  color: var(--color-brand);
  box-shadow: var(--shadow-accent-medium);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 3px;
}

@media (max-width: 960px) {
  .side-toolbar {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
    padding: 4px 8px;
    border-right: none;
    border-bottom: 1px solid var(--border-subtle);
    box-shadow: var(--shadow-toolbar-mobile);
    height: 40px;
  }

  .toolbar-section {
    flex-direction: row;
    gap: 12px;
    justify-content: center;
  }

  .mode-switch {
    flex-direction: row;
  }
}
</style>

