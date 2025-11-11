<template>
  <header class="about-header">
    <div class="brand" aria-label="Byte JSON 品牌标识">
      <span class="brand__logo-wrapper">
        <img class="brand__logo" :src="logo" alt="Byte JSON 标志" />
      </span>
      <span class="brand__mark">Byte</span>
      <span class="brand__name">JSON</span>
    </div>
    <div class="header-actions">
      <button class="theme-toggle" type="button" :title="themeToggleTitle" :aria-label="themeToggleTitle" @click="toggleTheme">
        <img class="theme-toggle__icon" :src="themeToggleIcon" :alt="themeToggleTitle" />
      </button>
      <button class="app-button app-button--primary" type="button" @click="goWorkspace">
        立即体验
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import MoonIcon from '../../assets/icons/moon.svg'
import Logo from '../../assets/logo.svg'
import SunSolidIcon from '../../assets/icons/sun-solid.svg'
import { useTheme } from '../../composables/useTheme'

const router = useRouter()
const { isDarkTheme, toggleTheme, themeToggleTitle } = useTheme()

const themeToggleIcon = computed<string>(() => (isDarkTheme.value ? SunSolidIcon : MoonIcon))
const logo = Logo

function goWorkspace() {
  router.push({ name: 'workspace' })
}
</script>

<style scoped lang="less">
.about-header {
  display: grid;
  grid-template-columns: auto max-content;
  gap: clamp(16px, 4vw, 28px);
  align-items: center;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;

  &__logo-wrapper {
    width: 56px;
    height: 56px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__logo {
    width: 40px;
    height: 40px;
  }

  &__mark {
    padding: 4px 10px;
    border-radius: 8px;
    background: rgba(77, 107, 255, 0.16);
    backdrop-filter: blur(8px);
    font-size: 15px;
    font-weight: 700;
  }

  &__name {
    font-size: 13px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
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
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--border-strong);
    transform: translateY(-1px);
  }
}

.theme-toggle__icon {
  width: 22px;
  height: 22px;
  transition: transform 0.2s ease;
}

.theme-toggle:hover .theme-toggle__icon {
  transform: rotate(10deg) scale(1.05);
}

:global([data-theme='dark'] .theme-toggle) {
  color: #f8fafc;
}

:global([data-theme='light'] .theme-toggle) {
  color: #1f2937;
}

@media (max-width: 960px) {
  .about-header {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .header-actions .app-button {
    width: 100%;
    justify-content: center;
  }

  .theme-toggle {
    align-self: flex-start;
  }
}

@media (max-width: 480px) {
  .brand__logo-wrapper {
    width: 48px;
    height: 48px;
  }

  .brand__logo {
    width: 34px;
    height: 34px;
  }
}
</style>


