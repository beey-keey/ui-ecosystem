import { describe, it, expect } from 'vitest'
import { loadTasks, saveTasks } from './taskRepository'

const storageKey = 'ui-ecosystem:task-management:tasks:v1'

describe('taskRepository', () => {
  it('returns independent copies of seed data', () => {
    const first = loadTasks()
    const second = loadTasks()
    expect(first).toHaveLength(3)
    expect(first).toEqual(second)
    expect(first[0]).not.toBe(second[0])
  })

  it('persists and reloads data', () => {
    const items = loadTasks().slice(0, 1)
    saveTasks(items)
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual(items)
    expect(loadTasks()).toEqual(items)
  })

  it('preserves an empty collection', () => {
    saveTasks([])
    expect(loadTasks()).toEqual([])
  })

  it('rejects malformed JSON', () => {
    localStorage.setItem(storageKey, '{')
    expect(() => loadTasks()).toThrow(SyntaxError)
  })

  it('rejects non-array stored data', () => {
    localStorage.setItem(storageKey, '{}')
    expect(() => loadTasks()).toThrow('Invalid stored data')
  })
})
