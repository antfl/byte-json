<script setup lang="ts">
type IconButtonIcon =
  | 'diff'
  | 'import'
  | 'export'
  | 'format'
  | 'minify'
  | 'repair'
  | 'clear'
  | 'sun'
  | 'moon'

export type { IconButtonIcon }

import clearIcon from '../assets/icons/clear.svg?raw'
import diffIcon from '../assets/icons/diff.svg?raw'
import exportIcon from '../assets/icons/export.svg?raw'
import formatIcon from '../assets/icons/format.svg?raw'
import importIcon from '../assets/icons/import.svg?raw'
import minifyIcon from '../assets/icons/minify.svg?raw'
import moonIcon from '../assets/icons/moon.svg?raw'
import repairIcon from '../assets/icons/repair.svg?raw'
import sunIcon from '../assets/icons/sun.svg?raw'

const props = withDefaults(
  defineProps<{
    icon: IconButtonIcon
    title: string
    variant?: 'ghost' | 'primary'
    active?: boolean
  }>(),
  {
    variant: 'ghost',
    active: false
  }
)

const emit = defineEmits<{
  (event: 'click'): void
}>()

const ICON_MAP: Record<IconButtonIcon, string> = {
  clear: clearIcon,
  diff: diffIcon,
  export: exportIcon,
  format: formatIcon,
  import: importIcon,
  minify: minifyIcon,
  moon: moonIcon,
  repair: repairIcon,
  sun: sunIcon
}

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <button
    type="button"
    :class="['icon-button', `icon-button--${props.variant}`, { 'icon-button--active': props.active }]"
    :title="props.title"
    :aria-label="props.title"
    @click="handleClick"
  >
    <span class="icon-button__icon" aria-hidden="true" v-html="ICON_MAP[props.icon]" />
  </button>
</template>

<style scoped>
.icon-button {
  width: var(--icon-button-size);
  height: var(--icon-button-size);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-base);
  border: none;
  background-color: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.icon-button__icon {
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-button__icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.icon-button--ghost {
  color: var(--text-primary);
}

.icon-button--ghost:hover {
  background-color: var(--button-hover-bg);
}

.icon-button--ghost.icon-button--active {
  background-color: var(--button-active-bg);
  color: var(--button-active-color);
}

.icon-button--primary {
  background-color: var(--accent-surface);
  color: var(--color-brand);
}

.icon-button--primary:hover,
.icon-button--primary.icon-button--active {
  background-color: var(--button-active-bg);
  color: var(--button-active-color);
}

.icon-button:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 3px;
}
</style>

