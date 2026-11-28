<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { UiInput, UiButton, UiAlert, UiSelect } from '@ui-ecosystem/ui-kit'
import type { TaskInput } from '../models/task'
const props = defineProps<{ initial: TaskInput }>()
const emit = defineEmits<{ save: [input: TaskInput]; cancel: [] }>()
const draft = reactive<TaskInput>({ ...props.initial })
const error = ref('')
const title = computed({
  get: () => draft.title,
  set: (value: string | number) => {
    draft.title = String(value)
  },
})
const description = computed({
  get: () => draft.description,
  set: (value: string | number) => {
    draft.description = String(value)
  },
})
const priority = computed({
  get: () => draft.priority,
  set: (value: string | number) => {
    draft.priority = String(value) as TaskInput['priority']
  },
})
const status = computed({
  get: () => draft.status,
  set: (value: string | number) => {
    draft.status = String(value) as TaskInput['status']
  },
})
const priorities = ['low', 'medium', 'high'].map((value) => ({ value, label: value }))
const statuses = [
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
]
function submit() {
  if (!draft.title.trim()) {
    error.value = 'Enter a task title.'
    return
  }
  emit('save', { ...draft, title: draft.title.trim(), description: draft.description.trim() })
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <UiAlert v-if="error" variant="error">{{ error }}</UiAlert>
    <UiInput v-model="title" label="Title" required />
    <UiInput v-model="description" label="Description" />
    <UiSelect v-model="priority" label="Priority" :options="priorities" />
    <UiSelect v-model="status" label="Status" :options="statuses" />
    <label>
      Due date
      <input v-model="draft.dueDate" type="date" />
    </label>
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
