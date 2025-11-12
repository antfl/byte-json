<script setup lang="ts">
import { onUnmounted } from 'vue'
import CodeEditor from 'monaco-editor-vue3'
import type { editor as MonacoEditorNS } from 'monaco-editor'

defineProps<{
  source: string
  previewContent: string
  editorTheme: string
  sourceEditorOptions: Record<string, unknown>
  previewEditorOptions: Record<string, unknown>
}>()

const emit = defineEmits<{
  (e: 'update:source', value: string): void
  (e: 'cursor-change', position: { line: number; column: number } | null): void
  (e: 'editor-mounted', editor: MonacoEditorNS.IStandaloneCodeEditor): void
}>()

let sourceEditorInstance: MonacoEditorNS.IStandaloneCodeEditor | null = null
let cursorChangeDisposable: MonacoEditorNS.IDisposable | null = null

function handleSourceEditorMount(editor: MonacoEditorNS.IStandaloneCodeEditor) {
  sourceEditorInstance = editor
  emit('editor-mounted', editor)
  
  // 监听光标位置变化
  cursorChangeDisposable = editor.onDidChangeCursorPosition((e) => {
    const position = editor.getPosition()
    if (position) {
      emit('cursor-change', {
        line: position.lineNumber,
        column: position.column
      })
    } else {
      emit('cursor-change', null)
    }
  })
  
  // 初始化光标位置
  const position = editor.getPosition()
  if (position) {
    emit('cursor-change', {
      line: position.lineNumber,
      column: position.column
    })
  }
}

onUnmounted(() => {
  if (cursorChangeDisposable) {
    cursorChangeDisposable.dispose()
    cursorChangeDisposable = null
  }
})
</script>

<template>
  <div class="editor-pane editor-pane--source">
    <CodeEditor
      :value="source"
      :theme="editorTheme"
      language="json"
      class="pane-body"
      :options="sourceEditorOptions"
      @update:value="emit('update:source', $event)"
      @editorDidMount="handleSourceEditorMount"
    />
  </div>
  <div class="editor-pane editor-pane--target">
    <CodeEditor
      :value="previewContent"
      :theme="editorTheme"
      language="json"
      class="pane-body"
      :options="previewEditorOptions"
    />
  </div>
</template>

<style scoped>
.editor-pane {
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--surface-primary);
  border-radius: 0;
}

.editor-pane--source {
  border-right: 1px solid var(--border-strong);
}

.editor-pane:not(.editor-pane--source) {
  box-shadow: none;
}

.pane-body {
  flex: 1;
  min-height: 0;
  width: 100%;
}

.pane-body :deep(.monaco-editor),
.pane-body :deep(.monaco-editor-vue3) {
  height: 100%;
}
</style>

