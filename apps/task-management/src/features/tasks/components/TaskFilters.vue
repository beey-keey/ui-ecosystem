<script setup lang="ts">
import { UiInput, UiSelect } from '@ui-ecosystem/ui-kit'

const search = defineModel<string | number>('search', { required: true })
const first = defineModel<string | number>('first', { required: true })
const second = defineModel<string | number>('second', { required: true })
</script>
<template>
  <div class="filters">
    <UiInput v-model="search" type="search" label="Search" placeholder="Search tasks" />
    <UiSelect
      v-model="first"
      label="Status"
      :options="[
        { value: '', label: 'All statuses' },
        { value: 'todo', label: 'To do' },
        { value: 'in-progress', label: 'In progress' },
        { value: 'completed', label: 'Completed' },
      ]"
    />
    <UiSelect
      v-model="second"
      label="Priority"
      :options="[
        { value: '', label: 'All priorities' },
        ...['low', 'medium', 'high'].map((value) => ({ value, label: value })),
      ]"
    />
  </div>
</template>
<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: var(--spacing-4);
}
</style>
