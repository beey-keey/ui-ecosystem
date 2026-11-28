import { describe, it, expect } from 'vitest'
import { loadProducts, saveProducts } from './productRepository'

const storageKey = 'ui-ecosystem:inventory-management:products:v1'

describe('productRepository', () => {
  it('returns independent copies of seed data', () => {
    const first = loadProducts()
    const second = loadProducts()
    expect(first).toHaveLength(3)
    expect(first).toEqual(second)
    expect(first[0]).not.toBe(second[0])
  })

  it('persists and reloads data', () => {
    const items = loadProducts().slice(0, 1)
    saveProducts(items)
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual(items)
    expect(loadProducts()).toEqual(items)
  })

  it('preserves an empty collection', () => {
    saveProducts([])
    expect(loadProducts()).toEqual([])
  })

  it('rejects malformed JSON', () => {
    localStorage.setItem(storageKey, '{')
    expect(() => loadProducts()).toThrow(SyntaxError)
  })

  it('rejects non-array stored data', () => {
    localStorage.setItem(storageKey, '{}')
    expect(() => loadProducts()).toThrow('Invalid stored data')
  })
})
