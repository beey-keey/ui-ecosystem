<script setup lang="ts">
import { UiInput, UiSelect } from '@ui-ecosystem/ui-kit'
defineProps<{ categories: string[] }>()
const search = defineModel<string | number>('search', { required: true })
const first = defineModel<string | number>('first', { required: true })
const second = defineModel<string | number>('second', { required: true })
</script>
<template>
  <div class="filters">
    <UiInput v-model="search" type="search" label="Search" placeholder="Search products" />
    <UiSelect
      v-model="first"
      label="Category"
      :options="[
        { value: '', label: 'All categories' },
        ...categories.map((value) => ({ value, label: value })),
      ]"
    />
    <UiSelect
      v-model="second"
      label="Stock"
      :options="[
        { value: '', label: 'All stock levels' },
        { value: 'available', label: 'Available' },
        { value: 'low', label: 'Low stock' },
        { value: 'out', label: 'Out of stock' },
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
