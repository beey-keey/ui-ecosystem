<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@ui-ecosystem/core'

import {
  UiButton,
  UiInput,
  UiSelect,
  UiCard,
  UiBadge,
  UiDialog,
  UiTable,
  UiTabs,
  UiAlert,
} from '@ui-ecosystem/ui-kit'

import type { InputValue, SelectValue, TableColumn, TabItem } from '@ui-ecosystem/ui-kit'

import { Search, Plus, Trash2, Mail } from '@lucide/vue'
// Theme configuration

const { brand, theme } = useTheme({
  storageKey: 'component-showcase-theme',
  defaultBrand: 'academic',
  defaultTheme: 'light',
})

// Input examples

const name = ref<InputValue>('')
const email = ref<InputValue>('')
const search = ref<InputValue>('')
const quantity = ref<InputValue>(10)
const readonlyValue = ref<InputValue>('Readonly value')
const disabledValue = ref<InputValue>('Disabled value')
const invalidValue = ref<InputValue>('')

// Select examples

const selectedCategory = ref<SelectValue>('electronics')

const categories = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Furniture', value: 'furniture' },
  { label: 'Accessories', value: 'accessories' },
]

// Dialog state

const dialogOpen = ref(false)

// Alert state

const showAlert = ref(true)

// Tabs

const activeTab = ref('overview')

const tabs: TabItem[] = [
  { label: 'Overview', value: 'overview' },
  { label: 'Details', value: 'details' },
  { label: 'Settings', value: 'settings' },
  { label: 'Disabled', value: 'disabled', disabled: true },
]

// Table data

const columns: TableColumn[] = [
  { key: 'name', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'stock', label: 'Stock', align: 'right' },
  { key: 'status', label: 'Status' },
]

const products = [
  {
    id: 1,
    name: 'Wireless keyboard',
    category: 'Electronics',
    stock: 42,
    status: 'Available',
  },
  {
    id: 2,
    name: 'Office chair',
    category: 'Furniture',
    stock: 5,
    status: 'Low stock',
  },
  {
    id: 3,
    name: 'USB-C hub',
    category: 'Accessories',
    stock: 0,
    status: 'Out of stock',
  },
]

const emptyProducts: typeof products = []

function getStatusVariant(status: unknown) {
  if (status === 'Available') return 'success'
  if (status === 'Low stock') return 'warning'
  return 'error'
}
</script>

<template>
  <main class="showcase">
    <header class="showcase-header">
      <div class="heading">
        <span class="eyebrow">UI ECOSYSTEM / COMPONENT LIBRARY</span>

        <h1>Component Showcase</h1>

        <p class="description">Reusable foundations for independent applications.</p>
      </div>

      <div class="theme-settings">
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

    <!-- Buttons -->

    <UiCard title="01 — Button" description="Variants, sizes, icons and interaction states.">
      <div class="component-content">
        <div class="component-row">
          <UiButton variant="primary">Primary</UiButton>
          <UiButton variant="secondary">Secondary</UiButton>
          <UiButton variant="accent">Accent</UiButton>
          <UiButton variant="outline">Outline</UiButton>
          <UiButton variant="ghost">Ghost</UiButton>

          <UiButton variant="destructive">
            <template #leading>
              <Trash2 />
            </template>
            Delete
          </UiButton>
        </div>

        <div class="component-row">
          <UiButton size="sm">Small</UiButton>
          <UiButton size="md">Medium</UiButton>
          <UiButton size="lg">Large</UiButton>
          <UiButton disabled>Disabled</UiButton>
          <UiButton loading>Loading</UiButton>

          <UiButton>
            <template #leading>
              <Plus />
            </template>
            Add item
          </UiButton>
        </div>

        <UiButton full-width variant="outline">Full width button</UiButton>
      </div>
    </UiCard>

    <!-- Inputs -->

    <UiCard title="02 — Input" description="Two-way binding, validation and input states.">
      <div class="component-grid">
        <UiInput
          v-model="name"
          label="Full name"
          placeholder="Enter your name"
          required
          full-width
        />

        <UiInput
          v-model="email"
          type="email"
          label="Email address"
          placeholder="name@example.com"
          full-width
        >
          <template #leading>
            <Mail />
          </template>
        </UiInput>

        <UiInput
          v-model="search"
          type="search"
          label="Search"
          placeholder="Search products..."
          full-width
        >
          <template #leading>
            <Search />
          </template>
        </UiInput>

        <UiInput v-model="quantity" type="number" label="Quantity" :min="0" full-width />

        <UiInput v-model="readonlyValue" label="Readonly" readonly full-width />

        <UiInput v-model="disabledValue" label="Disabled" disabled full-width />

        <UiInput
          v-model="invalidValue"
          label="Required field"
          error="This field is required."
          required
          full-width
        />

        <UiInput
          v-model="name"
          label="Display name"
          helper-text="This name will be visible to other users."
          full-width
        />
      </div>
    </UiCard>

    <!-- Select -->

    <UiCard title="03 — Select" description="Reusable option selection and validation.">
      <div class="component-grid">
        <UiSelect v-model="selectedCategory" label="Category" :options="categories" full-width />

        <UiSelect
          v-model="selectedCategory"
          label="Disabled select"
          :options="categories"
          disabled
          full-width
        />

        <UiSelect
          v-model="selectedCategory"
          label="Small select"
          size="sm"
          :options="categories"
          full-width
        />

        <UiSelect
          v-model="selectedCategory"
          label="Validation example"
          :options="categories"
          error="Please verify your selection."
          full-width
        />
      </div>
    </UiCard>

    <!-- Cards -->

    <UiCard title="04 — Card" description="Composable content containers.">
      <div class="metrics-grid">
        <UiCard title="Total products">
          <span class="metric-value">128</span>
        </UiCard>

        <UiCard title="Available" variant="accent">
          <span class="metric-value">96</span>
        </UiCard>

        <UiCard title="Pending" variant="secondary">
          <span class="metric-value">32</span>
        </UiCard>
      </div>
    </UiCard>

    <!-- Badges -->

    <UiCard title="05 — Badge" description="Semantic status indicators.">
      <div class="component-row">
        <UiBadge variant="neutral">Draft</UiBadge>
        <UiBadge variant="success">Completed</UiBadge>
        <UiBadge variant="warning">Pending</UiBadge>
        <UiBadge variant="error">Failed</UiBadge>
        <UiBadge variant="info">In progress</UiBadge>
      </div>
    </UiCard>

    <!-- Dialog -->

    <UiCard title="06 — Dialog" description="Modal interaction using the native dialog element.">
      <UiButton @click="dialogOpen = true">Open dialog</UiButton>

      <UiDialog v-model="dialogOpen" title="Confirm action">
        <p>This dialog is provided by the shared UI library.</p>

        <template #footer>
          <UiButton variant="outline" @click="dialogOpen = false">Cancel</UiButton>

          <UiButton @click="dialogOpen = false">Confirm</UiButton>
        </template>
      </UiDialog>
    </UiCard>

    <!-- Table -->

    <UiCard title="07 — Table" description="Dynamic columns, rows and custom cell slots.">
      <div class="component-content">
        <UiTable :columns="columns" :rows="products" row-key="id" caption="Product inventory">
          <template #cell-status="{ value }">
            <UiBadge :variant="getStatusVariant(value)">
              {{ value }}
            </UiBadge>
          </template>
        </UiTable>

        <h3>Empty state</h3>

        <UiTable
          :columns="columns"
          :rows="emptyProducts"
          row-key="id"
          caption="Empty product inventory"
          empty-text="No products found."
        />
      </div>
    </UiCard>

    <!-- Tabs -->

    <UiCard title="08 — Tabs" description="Accessible navigation between content panels.">
      <UiTabs v-model="activeTab" :tabs="tabs" label="Showcase navigation">
        <template #panel-overview>
          <p>Overview of the shared UI ecosystem.</p>
        </template>

        <template #panel-details>
          <p>Component contracts and implementation details.</p>
        </template>

        <template #panel-settings>
          <p>Application configuration and preferences.</p>
        </template>
      </UiTabs>
    </UiCard>

    <!-- Alerts -->

    <UiCard title="09 — Alert" description="Semantic feedback and dismissible notifications.">
      <div class="component-content">
        <UiAlert variant="success" title="Success">
          Your changes have been saved successfully.
        </UiAlert>

        <UiAlert variant="error" title="Error">An unexpected error occurred.</UiAlert>

        <UiAlert variant="warning" title="Warning">Some products are running low on stock.</UiAlert>

        <UiAlert variant="info" title="Information">A new version is available.</UiAlert>

        <UiAlert
          v-if="showAlert"
          variant="neutral"
          title="Dismissible alert"
          dismissible
          @dismiss="showAlert = false"
        >
          This notification can be dismissed.
        </UiAlert>

        <UiButton v-else variant="outline" @click="showAlert = true">Restore notification</UiButton>
      </div>
    </UiCard>

    <footer class="showcase-footer">UI Ecosystem — Shared Component Library</footer>
  </main>
</template>

<style scoped>
.showcase {
  max-width: 1200px;
  margin-inline: auto;
  padding: var(--spacing-12) var(--spacing-6);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.showcase-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-4);
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

.theme-settings {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.theme-settings label {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
}

.theme-settings select {
  min-height: var(--control-size-md);
  padding-inline: var(--spacing-3);
  background: var(--color-surface);
  color: var(--color-text);
  border: var(--border-width-sm) solid var(--color-border-strong);
  border-radius: var(--radius-md);
}

.component-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.component-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-3);
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-6);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-4);
}

.metric-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
}

.showcase-footer {
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  padding-block: var(--spacing-6);
}

@media (max-width: 640px) {
  .showcase {
    padding: var(--spacing-6) var(--spacing-4);
  }

  .component-grid,
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
