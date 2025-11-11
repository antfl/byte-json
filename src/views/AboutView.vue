<template>
  <div class="about-page">
    <div class="about-shell">
      <AboutHeader />

      <main class="about-content">
        <AboutHeroSection />
        <AboutFeatureSection />
        <AboutHighlightSection />
      </main>
    </div>
    <AboutFooter />
  </div>
</template>

<script setup lang="ts">
import AboutFeatureSection from '../components/about/AboutFeatureSection.vue'
import AboutFooter from '../components/about/AboutFooter.vue'
import AboutHeader from '../components/about/AboutHeader.vue'
import AboutHeroSection from '../components/about/AboutHeroSection.vue'
import AboutHighlightSection from '../components/about/AboutHighlightSection.vue'

defineOptions({ name: 'AboutView' })
</script>

<style scoped lang="less">
.about-page {
  --page-padding-x: clamp(20px, 4vw, 64px);
  --page-padding-top: clamp(32px, 6vw, 48px);
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--page-padding-top) var(--page-padding-x) 0;
  color: var(--text-primary);
  background:
    radial-gradient(120% 140% at 10% 10%, rgba(77, 107, 255, 0.32), transparent),
    radial-gradient(120% 140% at 90% 20%, rgba(16, 185, 129, 0.24), transparent),
    var(--app-gradient-start);
  overflow-x: hidden;
  overflow-y: auto;
}

.about-shell {
  width: min(1120px, 100%);
  display: flex;
  flex-direction: column;
  gap: clamp(36px, 5vw, 48px);
  align-self: center;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 8vw, 72px);
}

:global(.app-button) {
  padding: 10px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;
  text-decoration: none;
}

:global(.app-button--primary) {
  background: linear-gradient(135deg, #4d6bff, #6f8dff);
  color: #ffffff;
  box-shadow: 0 12px 28px rgba(77, 107, 255, 0.3);
}

:global(.app-button--primary:hover) {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px rgba(77, 107, 255, 0.38);
}

:global(.app-button--secondary) {
  background: #ffffff;
  border-color: rgba(99, 102, 241, 0.4);
  color: var(--color-brand);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.14);
}

:global(.app-button--secondary:hover) {
  transform: translateY(-1px);
  background: #f8fafc;
  border-color: rgba(79, 70, 229, 0.45);
  box-shadow: 0 14px 26px rgba(15, 23, 42, 0.18);
}

:global([data-theme='light'] .app-button--secondary) {
  background: #ffffff;
  border-color: rgba(99, 102, 241, 0.25);
  box-shadow: 0 8px 16px rgba(148, 163, 184, 0.18);
}

:global([data-theme='light'] .app-button--secondary:hover) {
  background: rgba(248, 250, 252, 0.92);
  border-color: rgba(79, 70, 229, 0.35);
  box-shadow: 0 12px 20px rgba(148, 163, 184, 0.22);
}

@media (max-width: 640px) {
  .about-shell {
    gap: 32px;
  }
}
</style>

