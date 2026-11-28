<script setup lang="ts">
import { computed, ref } from 'vue'
import { UiCard, UiButton, UiDialog, UiAlert } from '@ui-ecosystem/ui-kit'
import { useProductStore } from '../features/products/stores/productStore'
import type { Product, ProductInput } from '../features/products/models/product'
import ProductForm from '../features/products/components/ProductForm.vue'
import ProductFilters from '../features/products/components/ProductFilters.vue'
import ProductTable from '../features/products/components/ProductTable.vue'
const store = useProductStore()
const search = ref<string | number>('')
const first = ref<string | number>('')
const second = ref<string | number>('')
const formOpen = ref(false)
const deleteOpen = ref(false)
const editing = ref<Product | null>(null)
const deleting = ref<Product | null>(null)
const message = ref('')
const initial = ref<ProductInput>({
  name: '',
  description: '',
  category: '',
  quantity: 0,
  price: 0,
})
const formKey = ref(0)
const categories = computed(() => [...new Set(store.items.map((row) => row.category))].sort())
const rows = computed(() => {
  const q = String(search.value).trim().toLowerCase()
  return store.items.filter(
    (row) =>
      [row.name, row.description, row.category].some((value) => value.toLowerCase().includes(q)) &&
      (!first.value || row.category === first.value) &&
      (!second.value ||
        (row.quantity === 0 ? 'out' : row.quantity < 10 ? 'low' : 'available') === second.value),
  )
})
function openForm(row?: Product) {
  editing.value = row ?? null
  initial.value = row
    ? {
        name: row.name,
        description: row.description,
        category: row.category,
        quantity: row.quantity,
        price: row.price,
      }
    : { name: '', description: '', category: '', quantity: 0, price: 0 }
  message.value = ''
  formKey.value++
  formOpen.value = true
}
function save(input: ProductInput) {
  const ok = editing.value ? store.update(editing.value.id, input) : store.add(input)
  if (ok) formOpen.value = false
  else message.value = store.error || 'Unable to save record.'
}
function requestDelete(row: Product) {
  deleting.value = row
  message.value = ''
  deleteOpen.value = true
}
function confirmDelete() {
  if (!deleting.value) return
  if (store.remove(deleting.value.id)) deleteOpen.value = false
  else message.value = store.error || 'Unable to delete record.'
}
</script>
<template>
  <section class="page">
    <div class="heading">
      <div>
        <h1>Products</h1>
        <p>Manage your products.</p>
      </div>
      <UiButton @click="openForm()">Add product</UiButton>
    </div>
    <UiAlert v-if="store.error" variant="error">{{ store.error }}</UiAlert>
    <UiCard
      ><ProductFilters
        v-model:search="search"
        v-model:first="first"
        v-model:second="second"
        :categories="categories"
    /></UiCard>
    <UiCard :title="`${rows.length} of ${store.total} products`"
      ><ProductTable :rows="rows" @edit="openForm" @remove="requestDelete"
    /></UiCard>
    <UiDialog
      v-model="formOpen"
      :title="editing ? 'Edit product' : 'Add product'"
      :close-on-backdrop="false"
    >
      <UiAlert v-if="message" variant="error">{{ message }}</UiAlert>
      <ProductForm
        v-if="formOpen"
        :key="formKey"
        :initial="initial"
        @save="save"
        @cancel="formOpen = false"
      />
    </UiDialog>
    <UiDialog v-model="deleteOpen" title="Delete product?" :close-on-backdrop="false">
      <p>Delete {{ deleting?.name }}? This action cannot be undone.</p>
      <UiAlert v-if="message" variant="error">{{ message }}</UiAlert>
      <template #footer
        ><UiButton variant="outline" @click="deleteOpen = false">Cancel</UiButton
        ><UiButton variant="destructive" @click="confirmDelete">Delete</UiButton></template
      >
    </UiDialog>
  </section>
</template>
<style scoped>
.page {
  display: grid;
  gap: var(--spacing-6);
  min-width: 0;
}
.heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-4);
}
.heading p {
  color: var(--color-text-muted);
}
</style>
