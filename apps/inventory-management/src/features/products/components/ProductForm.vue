<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { UiInput, UiButton, UiAlert } from '@ui-ecosystem/ui-kit'
import type { ProductInput } from '../models/product'
const props = defineProps<{ initial: ProductInput }>()
const emit = defineEmits<{ save: [input: ProductInput]; cancel: [] }>()
const draft = reactive<ProductInput>({ ...props.initial })
const error = ref('')
const name = computed({
  get: () => draft.name,
  set: (value: string | number) => {
    draft.name = String(value)
  },
})
const description = computed({
  get: () => draft.description,
  set: (value: string | number) => {
    draft.description = String(value)
  },
})
const category = computed({
  get: () => draft.category,
  set: (value: string | number) => {
    draft.category = String(value)
  },
})
const quantity = computed({
  get: () => draft.quantity,
  set: (value: string | number) => {
    draft.quantity = value === '' ? NaN : Number(value)
  },
})
const price = computed({
  get: () => draft.price,
  set: (value: string | number) => {
    draft.price = value === '' ? NaN : Number(value)
  },
})

function submit() {
  if (
    !draft.name.trim() ||
    !draft.category.trim() ||
    !Number.isInteger(draft.quantity) ||
    draft.quantity < 0 ||
    !Number.isFinite(draft.price) ||
    draft.price < 0
  ) {
    error.value = 'Enter a name, category, non-negative whole quantity and valid price.'
    return
  }
  emit('save', {
    ...draft,
    name: draft.name.trim(),
    description: draft.description.trim(),
    category: draft.category.trim(),
  })
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <UiAlert v-if="error" variant="error">{{ error }}</UiAlert>
    <UiInput v-model="name" label="Name" required />
    <UiInput v-model="description" label="Description" />
    <UiInput v-model="category" label="Category" required />
    <UiInput v-model="quantity" label="Quantity" type="number" min="0" step="1" required />
    <UiInput v-model="price" label="Unit price" type="number" min="0" step="0.01" required />
    <div class="actions">
      <UiButton variant="outline" @click="emit('cancel')">Cancel</UiButton>
      <UiButton type="submit">Save</UiButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: var(--spacing-4);
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2);
}
label {
  display: grid;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
}
input {
  padding: var(--spacing-2);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
}
</style>
