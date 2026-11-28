import type { Product } from '../models/product'

const storageKey = 'ui-ecosystem:inventory-management:products:v1'
const seed: Product[] = [
  {
    id: 'p1',
    name: 'Wireless keyboard',
    description: '',
    category: 'Electronics',
    quantity: 42,
    price: 49.9,
  },
  {
    id: 'p2',
    name: 'Office chair',
    description: '',
    category: 'Furniture',
    quantity: 5,
    price: 129,
  },
  {
    id: 'p3',
    name: 'USB-C hub',
    description: '',
    category: 'Accessories',
    quantity: 0,
    price: 29.9,
  },
]

export function loadProducts(): Product[] {
  const raw = localStorage.getItem(storageKey)
  if (raw === null) return seed.map((item) => ({ ...item }))
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('Invalid stored data')
  return parsed as Product[]
}

export function saveProducts(items: Product[]): void {
  localStorage.setItem(storageKey, JSON.stringify(items))
}
