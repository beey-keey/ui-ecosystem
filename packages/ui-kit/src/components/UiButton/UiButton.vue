<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps } from "./UiButton.types";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  loading: false,
  fullWidth: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isDisabled = computed(() => props.disabled || props.loading);

const buttonClasses = computed(() => [
  "ui-button",
  `ui-button--${props.variant}`,
  `ui-button--${props.size}`,
  {
    "ui-button--full-width": props.fullWidth,
    "ui-button--loading": props.loading,
  },
]);

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    return;
  }

  emit("click", event);
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="isDisabled"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="ui-button__spinner" aria-hidden="true" />

    <span v-else-if="$slots.leading" class="ui-button__icon">
      <slot name="leading" />
    </span>

    <span v-if="$slots.default" class="ui-button__content">
      <slot />
    </span>

    <span v-if="$slots.trailing" class="ui-button__icon">
      <slot name="trailing" />
    </span>
  </button>
</template>

<style scoped>
/* ========================================
   Base
   ======================================== */

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);

  font-family: var(--font-family-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-tight);

  border: var(--border-width-sm) solid transparent;
  border-radius: var(--radius-md);

  cursor: pointer;
  user-select: none;

  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
}

/* ========================================
   Sizes
   ======================================== */

.ui-button--sm {
  min-height: var(--control-size-sm);
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-xs);
}

.ui-button--md {
  min-height: var(--control-size-md);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-sm);
}

.ui-button--lg {
  min-height: var(--control-size-lg);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-md);
}

/* ========================================
   Primary
   ======================================== */

.ui-button--primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.ui-button--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

/* ========================================
   Secondary
   ======================================== */

.ui-button--secondary {
  background: var(--color-secondary);
  color: var(--color-on-secondary);
}

.ui-button--secondary:hover:not(:disabled) {
  background: var(--color-secondary-hover);
}

/* ========================================
   Accent
   ======================================== */

.ui-button--accent {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.ui-button--accent:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

/* ========================================
   Outline
   ======================================== */

.ui-button--outline {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

.ui-button--outline:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

/* ========================================
   Ghost
   ======================================== */

.ui-button--ghost {
  background: transparent;
  color: var(--color-text);
}

.ui-button--ghost:hover:not(:disabled) {
  background: var(--color-surface-hover);
}

/* ========================================
   Destructive
   ======================================== */

.ui-button--destructive {
  background: var(--color-destructive);
  color: var(--color-on-destructive);
}

.ui-button--destructive:hover:not(:disabled) {
  background: var(--color-destructive-hover);
}

/* ========================================
   States
   ======================================== */

.ui-button:disabled {
  background: var(--color-disabled);
  color: var(--color-on-disabled);
  border-color: transparent;
  cursor: not-allowed;
}

.ui-button--loading:disabled {
  cursor: wait;
}

.ui-button--full-width {
  width: 100%;
}

/* ========================================
   Content and icons
   ======================================== */

.ui-button__content {
  display: inline-flex;
  align-items: center;
}

.ui-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ui-button__icon :deep(svg) {
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
}

.ui-button--lg .ui-button__icon :deep(svg) {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
}

/* ========================================
   Loading spinner
   ======================================== */

.ui-button__spinner {
  display: inline-block;
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
  flex-shrink: 0;

  border: var(--border-width-md) solid currentColor;
  border-inline-end-color: transparent;
  border-radius: var(--radius-full);

  animation: ui-button-spin 700ms linear infinite;
}

@keyframes ui-button-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-button__spinner {
    animation: none;
  }
}
</style>
