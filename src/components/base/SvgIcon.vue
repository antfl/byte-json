<script setup lang="ts">
type SvgIconName = string

export type { SvgIconName }

type ClassValue = string | Record<string, boolean> | Array<string | Record<string, boolean>>

const props = defineProps<{
  name: SvgIconName
  class?: ClassValue
}>()
</script>

<template>
  <svg :class="props.class" v-bind="$attrs" aria-hidden="true">
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>

