<script setup lang="ts">
import type { AlertProps } from "./UiAlert.types";
withDefaults(defineProps<AlertProps>(), {
  variant: "info",
  dismissible: false,
});
const emit = defineEmits<{ dismiss: [] }>();
</script>

<template>
  <div
    class="alert"
    :class="variant"
    :role="variant === 'error' ? 'alert' : 'status'"
  >
    <slot name="icon" />
    <div class="content">
      <strong v-if="title">{{ title }}</strong
      ><slot />
    </div>
    <button
      v-if="dismissible"
      type="button"
      aria-label="Dismiss message"
      @click="emit('dismiss')"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}
.content {
  flex: 1;
}
button {
  background: transparent;
  border: 0;
  color: inherit;
  font-size: var(--font-size-lg);
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
