import type { Task } from '../models/task'

const storageKey = 'ui-ecosystem:task-management:tasks:v1'
const seed: Task[] = [
  {
    id: 't1',
    title: 'Review UI components',
    description: 'Verify shared controls',
    priority: 'high',
    status: 'in-progress',
    dueDate: '',
  },
  {
    id: 't2',
    title: 'Prepare documentation',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
  },
  {
    id: 't3',
    title: 'Configure workspace',
    description: '',
    priority: 'low',
    status: 'completed',
    dueDate: '',
  },
]

export function loadTasks(): Task[] {
  const raw = localStorage.getItem(storageKey)
  if (raw === null) return seed.map((item) => ({ ...item }))
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('Invalid stored data')
  return parsed as Task[]
}

export function saveTasks(items: Task[]): void {
  localStorage.setItem(storageKey, JSON.stringify(items))
}
