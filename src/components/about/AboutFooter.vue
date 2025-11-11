<template>
  <footer class="about-footer" aria-label="底部备案信息">
    <div class="footer-info">
      <span class="footer-tagline">Byte JSON · 让结构化数据处理更简单</span>
      <div class="footer-icp">
        <span>ICP备案：渝ICP备2025064146号</span>
        <span class="footer-separator">·</span>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">工信部备案查询</a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="less">
.about-footer {
  width: calc(100% + 2 * var(--page-padding-x));
  margin: clamp(40px, 8vw, 72px) calc(-1 * var(--page-padding-x)) 0;
  padding: clamp(24px, 4vw, 32px) var(--page-padding-x);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  color: var(--text-muted);
  background: var(--surface-primary);
}

:global([data-theme='light'] .about-footer) {
  background: rgba(248, 250, 252, 0.92);
}

.footer-info {
  display: grid;
  gap: 6px;
}

.footer-tagline {
  font-size: 14px;
}

.footer-icp {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.footer-icp a {
  color: var(--color-brand);
  text-decoration: none;
}

.footer-icp a:hover {
  text-decoration: underline;
}

.footer-separator {
  color: rgba(148, 163, 184, 0.6);
}

@media (max-width: 640px) {
  .about-footer {
    width: calc(100% + 2 * var(--page-padding-x));
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>


