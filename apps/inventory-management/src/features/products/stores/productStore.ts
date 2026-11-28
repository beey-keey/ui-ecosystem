import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product, ProductInput } from '../models/product'
import { loadProducts, saveProducts } from '../repositories/productRepository'

export const useProductStore = defineStore('products', () => {
  const items = ref<Product[]>([])
  const error = ref<string | null>(null)
  try {
    items.value = loadProducts()
  } catch {
    error.value = 'Unable to load stored data.'
  }
  const total = computed(() => items.value.length)
  const lowStock = computed(
    () => items.value.filter((item) => item.quantity > 0 && item.quantity < 10).length,
  )
  const outOfStock = computed(() => items.value.filter((item) => item.quantity === 0).length)
  const totalValue = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity * item.price, 0),
  )

  function persist(next: Product[]) {
    try {
      saveProducts(next)
      items.value = next
      error.value = null
      return true
    } catch {
      error.value = 'Unable to save data.'
      return false
    }
  }

  function add(input: ProductInput) {
    return persist([...items.value, { ...input, id: crypto.randomUUID() }])
  }
  function update(id: string, input: ProductInput) {
    if (!items.value.some((item) => item.id === id)) return false
    return persist(items.value.map((item) => (item.id === id ? { ...input, id } : item)))
  }
  function remove(id: string) {
    if (!items.value.some((item) => item.id === id)) return false
    return persist(items.value.filter((item) => item.id !== id))
  }
  return { items, error, total, lowStock, outOfStock, totalValue, add, update, remove }
})
