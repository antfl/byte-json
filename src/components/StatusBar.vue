<script setup lang="ts">
import { computed } from 'vue'
import type { DiffState, MessageLevel, PanelKey } from '../types/jsonTools'

type StatusMessage = { level: MessageLevel; text: string } | null

const props = defineProps<{
  diffState: DiffState
  busyPanel: PanelKey | null
  message: StatusMessage
}>()

const dotClass = computed(() => {
  if (!props.diffState.ok) {
    return 'error'
  }
  if (props.diffState.hasDiff) {
    return 'warn'
  }
  return 'ok'
})
</script>

<template>
  <footer class="status-bar">
    <div class="status-left">
      <span class="dot" :class="dotClass" />
      <span>{{ diffState.message }}</span>
    </div>
    <div class="status-right">
      <span v-if="busyPanel" class="loading">处理中...</span>
      <span v-else-if="message" :class="['message', message.level]">{{ message.text }}</span>
      <span v-else aria-hidden="true"></span>
    </div>
  </footer>
</template>

<style scoped lang="less">
.status-bar {
  height: 25px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: var(--surface-status);
  border-top: 1px solid var(--border-subtle);
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--text-muted);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: var(--status-neutral);

  &.ok {
    background-color: var(--status-ok);
  }

  &.warn {
    background-color: var(--status-warn);
  }

  &.error {
    background-color: var(--status-error);
  }
}

.loading {
  color: var(--color-brand);
}

.message {
  &.success {
    color: #22c55e;
  }

  &.error {
    color: #ef4444;
  }

  &.info {
    color: var(--color-brand);
  }
}
</style>

