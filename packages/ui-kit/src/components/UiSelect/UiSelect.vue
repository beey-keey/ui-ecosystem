<script setup lang="ts">
import { computed, useId } from 'vue'
import type { SelectProps, SelectValue } from './UiSelect.types'
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<SelectProps>(), {
  size: 'md',
  disabled: false,
  required: false,
  fullWidth: false,
})
const model = defineModel<SelectValue>({ required: true })
const generatedId = useId()
const inputId = computed(() => props.id || generatedId)
const describedBy = computed(() =>
  props.error ? `${inputId.value}-error` : props.helperText ? `${inputId.value}-helper` : undefined,
)
</script>

<template>
  <div class="field" :class="{ full: fullWidth }">
    <label v-if="label" :for="inputId">
      {{ label }}
      <span v-if="required" class="required" aria-hidden="true">*</span>
    </label>
    <div class="control" :class="[size, { invalid: error, disabled }]">
      <span v-if="$slots.leading" class="icon"><slot name="leading" /></span>
      <select
        v-bind="$attrs"
        :id="inputId"
        v-model="model"
        :name="name"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :aria-invalid="Boolean(error)"
        :aria-describedby="
          [describedBy, $attrs['aria-describedby']].filter(Boolean).join(' ') || undefined
        "
      >
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      <span v-if="$slots.trailing" class="icon"><slot name="trailing" /></span>
    </div>
    <p v-if="error" :id="`${inputId}-error`" class="error">{{ error }}</p>
    <p v-else-if="helperText" :id="`${inputId}-helper`" class="helper">
      {{ helperText }}
    </p>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  min-width: 0;
}
.full {
  width: 100%;
}
label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}
.control {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  border: var(--border-width-sm) solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding-inline: var(--spacing-3);
}
.sm {
  min-height: var(--control-size-sm);
  font-size: var(--font-size-xs);
}
.md {
  min-height: var(--control-size-md);
  font-size: var(--font-size-sm);
}
.lg {
  min-height: var(--control-size-lg);
  font-size: var(--font-size-md);
}
.control:focus-within {
  outline: var(--border-width-md) solid var(--color-focus);
  outline-offset: var(--border-width-md);
}
.invalid {
  border-color: var(--color-error);
}
.invalid:focus-within {
  outline-color: var(--color-error);
}
.disabled {
  background: var(--color-disabled);
}
.readonly {
  background: var(--color-background);
}
input,
select {
  flex: 1;
  width: 100%;
  min-width: 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  padding-block: var(--spacing-2);
}
input:focus-visible,
select:focus-visible {
  outline: none;
}
input:disabled,
select:disabled {
  color: var(--color-on-disabled);
}
option {
  background: var(--color-surface);
  color: var(--color-text);
}
.icon {
  display: inline-flex;
  color: var(--color-text-muted);
}
.icon :deep(svg) {
  width: var(--icon-size-sm);
  height: var(--icon-size-sm);
}
.error,
.required {
  color: var(--color-error);
}
.helper {
  color: var(--color-text-muted);
}
.error,
.helper {
  font-size: var(--font-size-xs);
}
</style>
