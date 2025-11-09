<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import CodeEditor, { DiffEditor, createDefaultOptions } from 'monaco-editor-vue3'
import type { editor as MonacoEditorNS } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { jsonrepair } from 'jsonrepair'
import { create as createDiffer } from 'jsondiffpatch'

type PanelKey = 'source' | 'target'
type MessageLevel = 'success' | 'error' | 'info'

const themeName = 'byte-json-dark'
const differ = createDiffer({
  arrays: { detectMove: false, includeValueOnMove: false },
  textDiff: { minLength: 120 }
})

const state = reactive({
  source: `{
  "name": "Byte JSON",
  "description": "一个轻量的 JSON 工具"
}`,
  target: `{
  "name": "Byte JSON",
  "description": "一个轻量的 JSON 工具",
  "features": ["对比", "格式化", "修复", "导入导出"]
}`
})

const diffMode = ref(true)
const busyPanel = ref<PanelKey | null>(null)
const message = ref<{ level: MessageLevel; text: string } | null>(null)
const diffInstance = ref<MonacoEditorNS.IStandaloneDiffEditor | null>(null)
let messageTimer: number | null = null

const sourceInput = ref<HTMLInputElement | null>(null)
const targetInput = ref<HTMLInputElement | null>(null)

const baseEditorOptions = createDefaultOptions('json')
Object.assign(baseEditorOptions, {
  automaticLayout: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  formatOnPaste: true,
  formatOnType: true,
  renderLineHighlight: 'all',
  fontFamily: '"Cascadia Code", "Fira Code", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  fontSize: 14,
  lineHeight: 22,
  wordWrap: 'on',
  padding: { top: 16, bottom: 16 }
})

const diffEditorOptions: MonacoEditorNS.IStandaloneDiffEditorConstructionOptions = {
  ...baseEditorOptions,
  automaticLayout: true,
  enableSplitViewResizing: true,
  renderSideBySide: true,
  originalEditable: true,
  diffAlgorithm: 'advanced',
  readOnly: false
}

onMounted(() => {
  monaco.editor.defineTheme(themeName, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', background: '0F172A', foreground: 'E2E8F0' },
      { token: 'string.key.json', foreground: '38BDF8' },
      { token: 'string.value.json', foreground: 'FACC15' },
      { token: 'number', foreground: 'F97316' },
      { token: 'keyword.json', foreground: 'A855F7' },
      { token: 'delimiter', foreground: '64748B' }
    ],
    colors: {
      'editor.background': '#0f172a',
      'editor.foreground': '#e2e8f0',
      'editorCursor.foreground': '#38bdf8',
      'editor.lineHighlightBackground': '#1e293b',
      'editorLineNumber.foreground': '#475569',
      'editorLineNumber.activeForeground': '#e2e8f0',
      'editor.selectionBackground': '#1d4ed81f',
      'editor.inactiveSelectionBackground': '#1e293b40',
      'editorWidget.background': '#111827',
      'editorSuggestWidget.background': '#111827',
      'scrollbarSlider.background': '#33415599',
      'scrollbarSlider.hoverBackground': '#475569aa',
      'diffEditor.insertedTextBackground': '#16653433',
      'diffEditor.removedTextBackground': '#7f1d1d33',
      'panel.background': '#0f172a'
    }
  })
})

watch(
  () => diffMode.value,
  (enabled) => {
    if (!enabled) {
      diffInstance.value = null
    }
  }
)

const diffState = computed(() => {
  try {
    const left = JSON.parse(state.source)
    const right = JSON.parse(state.target)
    const delta = differ.diff(left, right)
    return {
      ok: true,
      hasDiff: Boolean(delta),
      message: delta ? '已检测到差异' : '内容一致'
    }
  } catch (error) {
    return {
      ok: false,
      hasDiff: false,
      message: '无法比较，存在无效的 JSON'
    }
  }
})

function showMessage(level: MessageLevel, text: string) {
  message.value = { level, text }
  if (messageTimer) {
    window.clearTimeout(messageTimer)
  }
  messageTimer = window.setTimeout(() => {
    message.value = null
    messageTimer = null
  }, 2800)
}

function handleFormat(panel: PanelKey, space = 2) {
  try {
    busyPanel.value = panel
    const source = state[panel]
    const parsed = JSON.parse(source)
    state[panel] = JSON.stringify(parsed, null, space)
    showMessage('success', panel === 'source' ? '源 JSON 已格式化' : '目标 JSON 已格式化')
  } catch (error) {
    showMessage('error', '格式化失败，请检查 JSON 是否有效')
  } finally {
    busyPanel.value = null
  }
}

function handleMinify(panel: PanelKey) {
  try {
    busyPanel.value = panel
    const parsed = JSON.parse(state[panel])
    state[panel] = JSON.stringify(parsed)
    showMessage('success', panel === 'source' ? '源 JSON 已压缩' : '目标 JSON 已压缩')
  } catch (error) {
    showMessage('error', '压缩失败，JSON 格式无效')
  } finally {
    busyPanel.value = null
  }
}

function handleRepair(panel: PanelKey) {
  try {
    busyPanel.value = panel
    const repaired = jsonrepair(state[panel])
    state[panel] = JSON.stringify(JSON.parse(repaired), null, 2)
    showMessage('success', panel === 'source' ? '尝试修复源 JSON 成功' : '尝试修复目标 JSON 成功')
  } catch (error) {
    showMessage('error', '修复失败，无法自动识别问题')
  } finally {
    busyPanel.value = null
  }
}

function triggerImport(panel: PanelKey) {
  const input = panel === 'source' ? sourceInput.value : targetInput.value
  input?.click()
}

function handleImport(panel: PanelKey, event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) {
    return
  }
  const file = input.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    state[panel] = String(reader.result ?? '')
    showMessage('success', `${file.name} 已加载到${panel === 'source' ? '源' : '目标'}面板`)
    input.value = ''
  }
  reader.onerror = () => {
    showMessage('error', '导入失败，请重试')
    input.value = ''
  }
  reader.readAsText(file, 'utf-8')
}

function handleExport(panel: PanelKey) {
  try {
    const blob = new Blob([state[panel]], { type: 'application/json;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = panel === 'source' ? 'source.json' : 'target.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
    showMessage('success', '导出成功')
  } catch (error) {
    showMessage('error', '导出失败')
  }
}

function handleClear(panel: PanelKey) {
  state[panel] = '{\n\n}'
}

function handleSwap() {
  const cached = state.source
  state.source = state.target
  state.target = cached
  showMessage('info', '已交换源与目标 JSON')
}

function handleDiffMount(editor: MonacoEditorNS.IStandaloneDiffEditor) {
  diffInstance.value = editor
  const originalModel = editor.getOriginalEditor().getModel()
  const modifiedModel = editor.getModifiedEditor().getModel()

  if (originalModel) {
    originalModel.onDidChangeContent(() => {
      state.source = originalModel.getValue()
    })
  }
  if (modifiedModel) {
    modifiedModel.onDidChangeContent(() => {
      state.target = modifiedModel.getValue()
    })
  }
}
</script>

<template>
  <div class="app">
    <header class="top-bar">
      <div class="brand">
        <span class="logo-dot" />
        <span class="brand-text">Byte JSON</span>
      </div>
      <div class="top-actions">
        <button class="ghost-button" @click="handleSwap">
          互换
        </button>
        <button
          class="primary-button"
          :class="{ active: diffMode }"
          @click="diffMode = !diffMode"
        >
          {{ diffMode ? '退出对比视图' : '进入对比视图' }}
        </button>
      </div>
    </header>

    <section class="workspace">
      <aside v-if="!diffMode" class="panel" data-side="left">
        <header class="panel-header">
          <h2>源 JSON</h2>
          <div class="panel-actions">
            <button class="ghost-button" @click="triggerImport('source')">导入</button>
            <button class="ghost-button" @click="handleExport('source')">导出</button>
            <button class="ghost-button" @click="handleFormat('source')">格式化</button>
            <button class="ghost-button" @click="handleMinify('source')">压缩</button>
            <button class="ghost-button" @click="handleRepair('source')">修复</button>
            <button class="ghost-button" @click="handleClear('source')">清空</button>
          </div>
        </header>
        <CodeEditor
          v-model:value="state.source"
          :theme="themeName"
          language="json"
          class="editor"
          :options="baseEditorOptions"
        />
      </aside>

      <aside v-if="!diffMode" class="panel" data-side="right">
        <header class="panel-header">
          <h2>目标 JSON</h2>
          <div class="panel-actions">
            <button class="ghost-button" @click="triggerImport('target')">导入</button>
            <button class="ghost-button" @click="handleExport('target')">导出</button>
            <button class="ghost-button" @click="handleFormat('target')">格式化</button>
            <button class="ghost-button" @click="handleMinify('target')">压缩</button>
            <button class="ghost-button" @click="handleRepair('target')">修复</button>
            <button class="ghost-button" @click="handleClear('target')">清空</button>
          </div>
        </header>
        <CodeEditor
          v-model:value="state.target"
          :theme="themeName"
          language="json"
          class="editor"
          :options="baseEditorOptions"
        />
      </aside>

      <div v-else class="diff-panel">
        <header class="panel-header diff-header">
          <div class="title-group">
            <h2>对比视图</h2>
            <span class="subtitle">{{ diffState.message }}</span>
          </div>
          <div class="panel-actions">
            <button class="ghost-button" @click="triggerImport('source')">导入源</button>
            <button class="ghost-button" @click="triggerImport('target')">导入目标</button>
            <button class="ghost-button" @click="handleFormat('source')">格式化源</button>
            <button class="ghost-button" @click="handleFormat('target')">格式化目标</button>
            <button class="ghost-button" @click="handleRepair('source')">修复源</button>
            <button class="ghost-button" @click="handleRepair('target')">修复目标</button>
            <button class="ghost-button" @click="handleExport('source')">导出源</button>
            <button class="ghost-button" @click="handleExport('target')">导出目标</button>
          </div>
        </header>
        <DiffEditor
          :original="state.source"
          :value="state.target"
          :theme="themeName"
          language="json"
          class="editor"
          :options="diffEditorOptions"
          @editorDidMount="handleDiffMount"
          @update:value="state.target = $event"
        />
      </div>
    </section>

    <footer class="status-bar">
      <div class="status-left">
        <span class="dot" :class="diffState.ok ? (diffState.hasDiff ? 'warn' : 'ok') : 'error'" />
        <span>{{ diffState.message }}</span>
      </div>
      <div class="status-right">
        <span v-if="busyPanel" class="loading">处理中...</span>
        <span v-else-if="message" :class="['message', message.level]">{{ message.text }}</span>
        <span v-else>准备就绪</span>
      </div>
    </footer>

    <input
      ref="sourceInput"
      type="file"
      accept=".json,application/json,.txt"
      class="hidden-input"
      @change="handleImport('source', $event)"
    />
    <input
      ref="targetInput"
      type="file"
      accept=".json,application/json,.txt"
      class="hidden-input"
      @change="handleImport('target', $event)"
    />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(160deg, #0f172a 0%, #0b1120 100%);
  color: #e2e8f0;
  overflow: hidden;
}

.top-bar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  flex-shrink: 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #38bdf8;
}

.logo-dot {
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, #38bdf8 0%, #6366f1 100%);
  box-shadow: 0 0 12px rgba(99, 102, 241, 0.45);
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.workspace {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px 20px 12px;
  flex: 1;
  overflow: hidden;
}

.workspace > .diff-panel {
  grid-column: span 2;
}

.panel,
.diff-panel {
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(100, 116, 139, 0.22);
  border-radius: 18px;
  padding: 16px;
  min-width: 0;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.4);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  gap: 12px;
  min-height: 32px;
}

.panel-header h2 {
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
}

.panel-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.diff-header {
  margin-bottom: 16px;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.subtitle {
  font-size: 13px;
  color: rgba(226, 232, 240, 0.7);
}

.editor {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
}

.status-bar {
  height: 36px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(15, 23, 42, 0.85);
  flex-shrink: 0;
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: rgba(148, 163, 184, 0.85);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: rgba(148, 163, 184, 0.6);
  box-shadow: 0 0 6px rgba(148, 163, 184, 0.4);
}

.dot.ok {
  background-color: #16a34a;
  box-shadow: 0 0 6px rgba(22, 163, 74, 0.6);
}

.dot.warn {
  background-color: #f97316;
  box-shadow: 0 0 6px rgba(249, 115, 22, 0.6);
}

.dot.error {
  background-color: #ef4444;
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.6);
}

.ghost-button,
.primary-button {
  height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.6);
  color: #e2e8f0;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
}

.ghost-button:hover,
.primary-button:hover {
  border-color: rgba(56, 189, 248, 0.75);
  color: #38bdf8;
  box-shadow: 0 8px 18px rgba(56, 189, 248, 0.18);
}

.primary-button {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.75), rgba(56, 189, 248, 0.85));
  border: none;
  color: #0b1120;
  font-weight: 600;
}

.primary-button.active {
  filter: none;
  color: #0b1120;
}

.primary-button:not(.active) {
  background: rgba(56, 189, 248, 0.18);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.45);
}

.loading {
  color: #38bdf8;
}

.message.success {
  color: #4ade80;
}

.message.error {
  color: #f87171;
}

.message.info {
  color: #38bdf8;
}

.hidden-input {
  display: none;
}

@media (max-width: 1280px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .workspace > .panel {
    grid-column: span 1;
  }

  .workspace > .diff-panel {
    grid-column: span 1;
  }

  .panel-actions {
    justify-content: flex-end;
  }
}
</style>