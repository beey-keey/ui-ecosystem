import type { User, UserInput, UserRepository } from '@ui-ecosystem/contracts'

interface TaskUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isActive: boolean
}

const storageKey = 'task-management-users'
const seed: TaskUser[] = [
  {
    id: 't1',
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex@example.com',
    role: 'Project manager',
    isActive: true,
  },
]

function load(): TaskUser[] {
  const raw = localStorage.getItem(storageKey)
  if (raw === null) return structuredClone(seed)
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('Invalid stored user data')
  return parsed as TaskUser[]
}

function save(records: TaskUser[]): void {
  localStorage.setItem(storageKey, JSON.stringify(records))
}

function toUser(record: TaskUser): User {
  return { ...record }
}

function fromUser(id: string, input: UserInput): TaskUser {
  return { id, ...input }
}

export class TaskUserAdapter implements UserRepository {
  async list(): Promise<User[]> {
    return load().map(toUser)
  }

  async create(input: UserInput): Promise<User> {
    const records = load()
    const record = fromUser(crypto.randomUUID(), input)
    save([...records, record])
    return toUser(record)
  }

  async update(id: string, input: UserInput): Promise<User> {
    const records = load()
    const index = records.findIndex((record) => record.id === id)
    if (index === -1) throw new Error('User not found')
    const record = fromUser(id, input)
    records[index] = record
    save(records)
    return toUser(record)
  }

  async remove(id: string): Promise<void> {
    const records = load()
    const remaining = records.filter((record) => record.id !== id)
    if (remaining.length === records.length) throw new Error('User not found')
    save(remaining)
  }
}
