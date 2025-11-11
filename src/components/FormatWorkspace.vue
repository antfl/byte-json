<script setup lang="ts">
import CodeEditor from 'monaco-editor-vue3'

defineProps<{
  source: string
  previewContent: string
  editorTheme: string
  previewEditorOptions: Record<string, unknown>
}>()

const emit = defineEmits<{
  (e: 'update:source', value: string): void
}>()
</script>

<template>
  <div class="editor-pane editor-pane--source text-input-pane">
    <textarea
      :value="source"
      placeholder="在此粘贴或输入 JSON 字符串"
      @input="emit('update:source', ($event.target as HTMLTextAreaElement).value)"
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

<style scoped lang="less">
.editor-pane {
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--surface-primary);

  &.text-input-pane {
    position: relative;
    border-right: 1px solid var(--border-strong);

    textarea {
      width: 100%;
      height: 100%;
      padding: 16px;
      border: none;
      outline: none;
      resize: none;
      box-sizing: border-box;
      background: transparent;
      color: var(--text-primary);
      font-family: var(--font-code);
      font-size: 14px;
      line-height: 22px;

      &::placeholder {
        color: var(--text-muted);
      }
    }
  }
}

.pane-body {
  flex: 1;
  min-height: 0;
  width: 100%;

  :deep(.monaco-editor),
  :deep(.monaco-editor-vue3) {
    height: 100%;
  }
}
</style>

