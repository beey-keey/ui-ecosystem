<script setup lang="ts">
import { useId, ref } from 'vue'
import type { TabsProps } from './UiTabs.types'
const props = withDefaults(defineProps<TabsProps>(), { label: 'Tabs' })
const model = defineModel<string>({ required: true })
const id = useId()
const list = ref<HTMLElement | null>(null)
function navigate(event: KeyboardEvent, index: number) {
  const enabled = props.tabs.map((tab, i) => ({ tab, i })).filter((x) => !x.tab.disabled)
  if (!enabled.length) return
  const current = enabled.findIndex((x) => x.i === index)
  let next: number
  switch (event.key) {
    case 'ArrowRight':
      next = (current + 1) % enabled.length
      break
    case 'ArrowLeft':
      next = (current - 1 + enabled.length) % enabled.length
      break
    case 'Home':
      next = 0
      break
    case 'End':
      next = enabled.length - 1
      break
    default:
      return
  }
  event.preventDefault()
  const target = enabled[next]
  if (!target) return
  model.value = target.tab.value
  list.value?.querySelectorAll<HTMLButtonElement>('button')[target.i]?.focus()
}
</script>

<template>
  <div>
    <div ref="list" class="tabs" role="tablist" :aria-label="label">
      <button
        v-for="(tab, index) in tabs"
        :id="`${id}-tab-${index}`"
        :key="tab.value"
        type="button"
        role="tab"
        :aria-selected="model === tab.value"
        :aria-controls="`${id}-panel-${index}`"
        :tabindex="model === tab.value ? 0 : -1"
        :disabled="tab.disabled"
        @click="model = tab.value"
        @keydown="navigate($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      v-for="(tab, index) in tabs"
      v-show="model === tab.value"
      :id="`${id}-panel-${index}`"
      :key="tab.value"
      role="tabpanel"
      :aria-labelledby="`${id}-tab-${index}`"
      tabindex="0"
      class="panel"
    >
      <slot :name="`panel-${tab.value}`" />
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: var(--spacing-2);
  overflow-x: auto;
  border-bottom: var(--border-width-sm) solid var(--color-border);
}
button {
  white-space: nowrap;
  background: transparent;
  color: var(--color-text-muted);
  border: 0;
  border-bottom: var(--border-width-md) solid transparent;
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-sm);
}
button[aria-selected='true'] {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
button:hover:not(:disabled) {
  background: var(--color-surface-hover);
}
button:disabled {
  color: var(--color-text-disabled);
}
.panel {
  padding-block: var(--spacing-4);
}
</style>
