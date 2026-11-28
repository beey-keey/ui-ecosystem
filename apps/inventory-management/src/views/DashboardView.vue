<script setup lang="ts">
import { useRouter } from 'vue-router'
import { UiCard, UiTable, UiBadge, UiButton, UiAlert } from '@ui-ecosystem/ui-kit'
import type { TableColumn } from '@ui-ecosystem/ui-kit'
import { useProductStore } from '../features/products/stores/productStore'

const store = useProductStore()
const router = useRouter()
const columns: TableColumn[] = [
  { key: 'name', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'quantity', label: 'Quantity', align: 'right' },
  { key: 'price', label: 'Unit price', align: 'right' },
  { key: 'status', label: 'Status' },
]
const formatAmount = (value: number) =>
  new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
</script>

<template>
  <section class="dashboard">
    <div class="heading">
      <h1>Dashboard</h1>
      <p>Overview of your inventory and stock levels.</p>
    </div>
    <UiAlert v-if="store.error" variant="error">{{ store.error }}</UiAlert>
    <div class="metrics">
      <UiCard title="Total products" variant="accent"
        ><p class="metric">{{ store.total }}</p></UiCard
      >
      <UiCard title="Low stock" variant="secondary"
        ><p class="metric">{{ store.lowStock }}</p></UiCard
      >
      <UiCard title="Out of stock"
        ><p class="metric">{{ store.outOfStock }}</p></UiCard
      >
      <UiCard title="Inventory value"
        ><p class="metric">{{ formatAmount(store.totalValue) }}</p></UiCard
      >
    </div>
    <UiCard title="Inventory overview" description="Current products and availability.">
      <UiTable
        :columns="columns"
        :rows="store.items"
        row-key="id"
        caption="Inventory overview"
        empty-text="No products yet."
      >
        <template #cell-price="{ row }">{{ formatAmount(row.price) }}</template>
        <template #cell-status="{ row }"
          ><UiBadge
            :variant="row.quantity === 0 ? 'error' : row.quantity < 10 ? 'warning' : 'success'"
            >{{
              row.quantity === 0 ? 'Out of stock' : row.quantity < 10 ? 'Low stock' : 'Available'
            }}</UiBadge
          ></template
        >
      </UiTable>
      <div class="section-actions">
        <UiButton variant="outline" @click="router.push({ name: 'products' })"
          >View products</UiButton
        >
      </div>
    </UiCard>
  </section>
</template>

<style scoped>
.dashboard {
  display: grid;
  gap: var(--spacing-6);
  min-width: 0;
}
.heading {
  display: grid;
  gap: var(--spacing-2);
}
.heading p {
  color: var(--color-text-muted);
}
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: var(--spacing-4);
}
.metric {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
}
.section-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-4);
}
</style>
