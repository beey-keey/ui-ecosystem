import { beforeEach, describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { ProductInput } from '../models/product'
import { loadProducts } from '../repositories/productRepository'
import { useProductStore } from './productStore'

const storageKey = 'ui-ecosystem:inventory-management:products:v1'
const input: ProductInput = {
  name: 'New product',
  description: '',
  category: 'Electronics',
  quantity: 9,
  price: 10,
}

describe('useProductStore', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('loads seed data and computes initial metrics', () => {
    const store = useProductStore()
    expect(store.total).toBe(3)
    expect(store.error).toBeNull()
    expect(store.lowStock).toBe(1)
    expect(store.outOfStock).toBe(1)
    expect(store.totalValue).toBeCloseTo(2740.8)
  })

  it('adds an item with a unique id and persists it', () => {
    const store = useProductStore()
    expect(store.add(input)).toBe(true)
    expect(store.total).toBe(4)
    const added = store.items.find((item) => !['p1', 'p2', 'p3'].includes(item.id))
    expect(added).toEqual({ ...input, id: expect.any(String) })
    expect(new Set(store.items.map((item) => item.id)).size).toBe(4)
    expect(loadProducts()).toEqual(store.items)
  })

  it('updates an existing item and persists the changes', () => {
    const store = useProductStore()
    const next: ProductInput = { ...input, quantity: 0 }
    expect(store.update('p1', next)).toBe(true)
    expect(store.items.find((item) => item.id === 'p1')).toEqual({ ...next, id: 'p1' })
    expect(loadProducts()).toEqual(store.items)
  })

  it('recomputes metrics after adding and updating an item', () => {
    const store = useProductStore()
    store.add(input)
    const added = store.items[store.items.length - 1]!
    expect(store.update(added.id, { ...input, quantity: 0 })).toBe(true)
    expect(store.lowStock).toBe(1)
    expect(store.outOfStock).toBe(2)
    expect(store.totalValue).toBeCloseTo(2740.8)
  })

  it('removes an existing item and persists the changes', () => {
    const store = useProductStore()
    expect(store.remove('p1')).toBe(true)
    expect(store.total).toBe(2)
    expect(store.items.some((item) => item.id === 'p1')).toBe(false)
    expect(loadProducts()).toEqual(store.items)
  })

  it('rejects operations on unknown ids without changing data', () => {
    const store = useProductStore()
    const before = JSON.stringify(store.items)
    expect(store.update('missing', input)).toBe(false)
    expect(store.remove('missing')).toBe(false)
    expect(JSON.stringify(store.items)).toBe(before)
    expect(localStorage.getItem(storageKey)).toBeNull()
  })

  it('loads previously persisted data in a new store', () => {
    const store = useProductStore()
    store.add(input)
    const saved = JSON.parse(JSON.stringify(store.items))
    setActivePinia(createPinia())
    expect(useProductStore().items).toEqual(saved)
  })

  it('handles invalid stored data', () => {
    localStorage.setItem(storageKey, '{}')
    const store = useProductStore()
    expect(store.items).toEqual([])
    expect(store.error).toBe('Unable to load stored data.')
  })

  it('preserves state on save failure and recovers on retry', () => {
    const store = useProductStore()
    const before = JSON.stringify(store.items)
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
      throw new Error('Storage unavailable')
    })
    expect(store.add(input)).toBe(false)
    expect(JSON.stringify(store.items)).toBe(before)
    expect(store.error).toBe('Unable to save data.')
    spy.mockRestore()
    expect(store.add(input)).toBe(true)
    expect(store.error).toBeNull()
    expect(store.total).toBe(4)
  })
})
