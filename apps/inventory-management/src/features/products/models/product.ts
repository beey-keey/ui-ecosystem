export interface Product {
  id: string
  name: string
  description: string
  category: string
  quantity: number
  price: number
}

export type ProductInput = Omit<Product, 'id'>
