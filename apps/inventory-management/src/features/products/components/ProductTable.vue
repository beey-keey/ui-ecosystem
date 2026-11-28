<script setup lang="ts">
import { UiTable, UiBadge, UiButton } from '@ui-ecosystem/ui-kit'
import type { TableColumn } from '@ui-ecosystem/ui-kit'
import type { Product } from '../models/product'
defineProps<{ rows: Product[] }>()
const emit = defineEmits<{ edit: [row: Product]; remove: [row: Product] }>()
const columns: TableColumn[] = [
  { key: 'name', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'price', label: 'Unit price' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
]
</script>
<template>
  <UiTable
    :columns="columns"
    :rows="rows"
    row-key="id"
    caption="Product list"
    empty-text="No matching products."
  >
    <template #cell-price="{ row }">{{ row.price.toFixed(2) }}</template>
    <template #cell-status="{ row }"
      ><UiBadge
        :variant="row.quantity === 0 ? 'error' : row.quantity < 10 ? 'warning' : 'success'"
        >{{
          row.quantity === 0 ? 'Out of stock' : row.quantity < 10 ? 'Low stock' : 'Available'
        }}</UiBadge
      ></template
    >
    <template #cell-actions="{ row }"
      ><div class="actions">
        <UiButton size="sm" variant="outline" @click="emit('edit', row)">Edit</UiButton
        ><UiButton size="sm" variant="destructive" @click="emit('remove', row)">Delete</UiButton>
      </div></template
    >
  </UiTable>
</template>
<style scoped>
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}
</style>
