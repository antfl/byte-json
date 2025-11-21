<script setup lang="ts">
const iconModules = import.meta.glob('../../assets/icons/*.svg', { 
  as: 'raw',
  eager: true 
})

function getIconName(path: string): string {
  const match = path.match(/\/([^/]+)\.svg$/)
  return match?.[1] ?? ''
}

const iconMap: Record<string, string> = {}

for (const path in iconModules) {
  const iconName = getIconName(path)
  if (iconName) {
    iconMap[iconName] = iconModules[path] as string
  }
}

type SvgIconName = string

export type { SvgIconName }

type ClassValue = string | Record<string, boolean> | Array<string | Record<string, boolean>>

const props = defineProps<{
  name: SvgIconName
  class?: ClassValue
}>()
</script>

<template>
  <span :class="props.class" v-bind="$attrs" v-html="iconMap[name]" />
</template>

