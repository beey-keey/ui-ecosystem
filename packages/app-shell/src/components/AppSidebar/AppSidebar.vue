<script setup lang="ts">
import type { NavigationItem } from '../../types'
defineProps<{
  appName: string
  items: readonly NavigationItem[]
  activeId: string
}>()
const emit = defineEmits<{ navigate: [id: string] }>()
</script>

<template>
  <aside class="sidebar">
    <div class="identity">
      <small>UI ECOSYSTEM</small>
      <strong>{{ appName }}</strong>
    </div>
    <nav aria-label="Main navigation">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        :aria-current="item.id === activeId ? 'page' : undefined"
        :class="{ active: item.id === activeId }"
        @click="emit('navigate', item.id)"
      >
        <component :is="item.icon" v-if="item.icon" aria-hidden="true" />
        {{ item.label }}
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  background: var(--color-surface);
  border-inline-end: var(--border-width-sm) solid var(--color-border);
  padding: var(--spacing-4);
}
.identity {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  margin-bottom: var(--spacing-6);
}
.identity small {
  color: var(--color-text-muted);
  letter-spacing: var(--letter-spacing-wide);
}
nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}
button {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  text-align: start;
  width: 100%;
  min-height: var(--control-size-md);
  padding: var(--spacing-3);
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text);
}
button:hover {
  background: var(--color-surface-hover);
}
button.active {
  background: var(--color-primary);
  color: var(--color-on-primary);
}
button :deep(svg) {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
  flex-shrink: 0;
}
</style>
