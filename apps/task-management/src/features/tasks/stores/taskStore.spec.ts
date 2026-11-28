import { beforeEach, describe, it, expect, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { TaskInput } from '../models/task'
import { loadTasks } from '../repositories/taskRepository'
import { useTaskStore } from './taskStore'

const storageKey = 'ui-ecosystem:task-management:tasks:v1'
const input: TaskInput = {
  title: 'New task',
  description: '',
  priority: 'high',
  status: 'todo',
  dueDate: '',
}

describe('useTaskStore', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('loads seed data and computes initial metrics', () => {
    const store = useTaskStore()
    expect(store.total).toBe(3)
    expect(store.error).toBeNull()
    expect(store.completed).toBe(1)
    expect(store.inProgress).toBe(1)
  })

  it('adds an item with a unique id and persists it', () => {
    const store = useTaskStore()
    expect(store.add(input)).toBe(true)
    expect(store.total).toBe(4)
    const added = store.items.find((item) => !['t1', 't2', 't3'].includes(item.id))
    expect(added).toEqual({ ...input, id: expect.any(String) })
    expect(new Set(store.items.map((item) => item.id)).size).toBe(4)
    expect(loadTasks()).toEqual(store.items)
  })

  it('updates an existing item and persists the changes', () => {
    const store = useTaskStore()
    const next: TaskInput = { ...input, status: 'completed' }
    expect(store.update('t1', next)).toBe(true)
    expect(store.items.find((item) => item.id === 't1')).toEqual({ ...next, id: 't1' })
    expect(loadTasks()).toEqual(store.items)
  })

  it('recomputes metrics after adding and updating an item', () => {
    const store = useTaskStore()
    store.add(input)
    const added = store.items[store.items.length - 1]!
    expect(store.update(added.id, { ...input, status: 'completed' })).toBe(true)
    expect(store.completed).toBe(2)
  })

  it('removes an existing item and persists the changes', () => {
    const store = useTaskStore()
    expect(store.remove('t1')).toBe(true)
    expect(store.total).toBe(2)
    expect(store.items.some((item) => item.id === 't1')).toBe(false)
    expect(loadTasks()).toEqual(store.items)
  })

  it('rejects operations on unknown ids without changing data', () => {
    const store = useTaskStore()
    const before = JSON.stringify(store.items)
    expect(store.update('missing', input)).toBe(false)
    expect(store.remove('missing')).toBe(false)
    expect(JSON.stringify(store.items)).toBe(before)
    expect(localStorage.getItem(storageKey)).toBeNull()
  })

  it('loads previously persisted data in a new store', () => {
    const store = useTaskStore()
    store.add(input)
    const saved = JSON.parse(JSON.stringify(store.items))
    setActivePinia(createPinia())
    expect(useTaskStore().items).toEqual(saved)
  })

  it('handles invalid stored data', () => {
    localStorage.setItem(storageKey, '{}')
    const store = useTaskStore()
    expect(store.items).toEqual([])
    expect(store.error).toBe('Unable to load stored data.')
  })

  it('preserves state on save failure and recovers on retry', () => {
    const store = useTaskStore()
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
