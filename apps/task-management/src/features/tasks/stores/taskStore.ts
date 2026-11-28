import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Task, TaskInput } from '../models/task'
import { loadTasks, saveTasks } from '../repositories/taskRepository'

export const useTaskStore = defineStore('tasks', () => {
  const items = ref<Task[]>([])
  const error = ref<string | null>(null)
  try {
    items.value = loadTasks()
  } catch {
    error.value = 'Unable to load stored data.'
  }
  const total = computed(() => items.value.length)
  const completed = computed(() => items.value.filter((item) => item.status === 'completed').length)
  const inProgress = computed(
    () => items.value.filter((item) => item.status === 'in-progress').length,
  )

  function persist(next: Task[]) {
    try {
      saveTasks(next)
      items.value = next
      error.value = null
      return true
    } catch {
      error.value = 'Unable to save data.'
      return false
    }
  }

  function add(input: TaskInput) {
    return persist([...items.value, { ...input, id: crypto.randomUUID() }])
  }
  function update(id: string, input: TaskInput) {
    if (!items.value.some((item) => item.id === id)) return false
    return persist(items.value.map((item) => (item.id === id ? { ...input, id } : item)))
  }
  function remove(id: string) {
    if (!items.value.some((item) => item.id === id)) return false
    return persist(items.value.filter((item) => item.id !== id))
  }
  return { items, error, total, completed, inProgress, add, update, remove }
})
