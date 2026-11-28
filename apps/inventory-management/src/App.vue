<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from '@ui-ecosystem/core'
import { UiButton } from '@ui-ecosystem/ui-kit'
import { Plus } from '@lucide/vue'

const { brand, theme } = useTheme({
  storageKey: 'inventory-management-theme',
  defaultBrand: 'studio',
  defaultTheme: 'light',
})

interface Product {
  id: number
  name: string
  category: string
  stock: number
}

const search = ref('')

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Wireless keyboard',
    category: 'Electronics',
    stock: 42,
  },
  {
    id: 2,
    name: 'Office chair',
    category: 'Furniture',
    stock: 5,
  },
  {
    id: 3,
    name: 'USB-C hub',
    category: 'Accessories',
    stock: 24,
  },
  {
    id: 4,
    name: 'Desk lamp',
    category: 'Lighting',
    stock: 3,
  },
])

const filteredProducts = computed(() => {
  const query = search.value.trim().toLowerCase()

  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query),
  )
})

const totalProducts = computed(() => products.value.length)

const inStock = computed(() => products.value.filter((product) => product.stock >= 10).length)

const lowStock = computed(() => products.value.filter((product) => product.stock < 10).length)
</script>

<template>
  <main class="showcase">
    <header class="showcase-header">
      <div class="heading">
        <span class="eyebrow">UI ECOSYSTEM / INVENTORY</span>

        <h1>Inventory Management</h1>

        <p class="description">Manage products, categories and stock levels.</p>
      </div>

      <div class="settings">
        <label>
          Brand
          <select v-model="brand">
            <option value="academic">Academic</option>
            <option value="studio">Studio</option>
          </select>
        </label>

        <label>
          Theme
          <select v-model="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
    </header>

    <section class="metrics" aria-label="Inventory overview">
      <article class="metric metric-accent">
        <span>Total products</span>
        <h2>{{ totalProducts }}</h2>
      </article>

      <article class="metric metric-secondary">
        <span>Healthy stock</span>
        <h2>{{ inStock }}</h2>
      </article>

      <article class="metric">
        <span>Low stock</span>
        <h2>{{ lowStock }}</h2>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h3>Products</h3>
          <p class="description">Overview of your current inventory.</p>
        </div>

        <UiButton variant="primary" disabled>
          <template #leading>
            <Plus />
          </template>

          Add product
        </UiButton>
      </div>

      <div class="search">
        <label for="product-search" class="visually-hidden"> Search products </label>

        <input
          id="product-search"
          v-model="search"
          type="search"
          placeholder="Search products..."
        />
      </div>

      <div class="table-wrapper">
        <table>
          <caption class="visually-hidden">
            Inventory products and stock levels
          </caption>

          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Stock</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td class="product-name">
                {{ product.name }}
              </td>

              <td>{{ product.category }}</td>

              <td>{{ product.stock }}</td>

              <td>
                <span
                  class="status"
                  :class="product.stock < 10 ? 'status-warning' : 'status-success'"
                >
                  {{ product.stock < 10 ? 'Low stock' : 'In stock' }}
                </span>
              </td>
            </tr>

            <tr v-if="filteredProducts.length === 0">
              <td colspan="4" class="empty-state">No products match your search.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<style scoped>
.showcase {
  max-width: 1120px;
  margin-inline: auto;
  padding: var(--spacing-12) var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--spacing-6);
}

.heading {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.eyebrow {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-muted);
}

.description {
  color: var(--color-text-muted);
}

.settings {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.settings label {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
}

.settings select,
.search input {
  min-height: var(--control-size-md);
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-4);
}

.metric {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.metric-accent {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.metric-secondary {
  background: var(--color-secondary);
  color: var(--color-on-secondary);
}

.metric h2 {
  color: inherit;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  padding: var(--spacing-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.panel-header .description {
  margin-top: var(--spacing-2);
}

.search input {
  width: 100%;
  max-width: 360px;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 540px;
  text-align: left;
  font-size: var(--font-size-sm);
}

th,
td {
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-border);
}

th {
  background: var(--color-background);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: var(--color-surface-hover);
}

.product-name {
  font-weight: var(--font-weight-medium);
}

.status {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.status-success {
  background: var(--color-success-background);
  color: var(--color-success);
}

.status-warning {
  background: var(--color-warning-background);
  color: var(--color-warning);
}

.empty-state {
  padding: var(--spacing-8);
  text-align: center;
  color: var(--color-text-muted);
}

@media (max-width: 640px) {
  .showcase {
    padding: var(--spacing-6) var(--spacing-4);
  }

  .metrics {
    grid-template-columns: 1fr;
  }
}
</style>
