<script setup lang="ts">
import type { BadgeProps } from './UiBadge.types'
withDefaults(defineProps<BadgeProps>(), { variant: 'neutral' })
</script>

<template>
  <span class="badge" :class="variant"><slot /></span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}
.success {
  background: var(--color-success-background);
  color: var(--color-success);
}
.error {
  background: var(--color-error-background);
  color: var(--color-error);
}
.warning {
  background: var(--color-warning-background);
  color: var(--color-warning);
}
.info {
  background: var(--color-info-background);
  color: var(--color-info);
}
.neutral {
  background: var(--color-surface-hover);
  color: var(--color-text);
}
</style>
