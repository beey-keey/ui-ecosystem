<script setup lang="ts">
import { UiButton } from '@ui-ecosystem/ui-kit'
defineProps<{ title: string; expanded: boolean; controls: string }>()
const emit = defineEmits<{ toggle: [] }>()
</script>

<template>
  <header class="header">
    <UiButton
      variant="ghost"
      :aria-expanded="expanded"
      :aria-controls="expanded ? controls : undefined"
      @click="emit('toggle')"
    >
      {{ expanded ? 'Hide menu' : 'Show menu' }}
    </UiButton>
    <span class="title">{{ title }}</span>
    <div class="actions"><slot name="actions" /></div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-6);
  background: var(--color-surface);
  border-bottom: var(--border-width-sm) solid var(--color-border);
}
.title {
  font-weight: var(--font-weight-semibold);
}
.actions {
  margin-inline-start: auto;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}
</style>
