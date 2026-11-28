import type { User, UserInput, UserRepository } from '@ui-ecosystem/contracts'

interface InventoryUser {
  userId: string
  name: { given: string; family: string }
  emailAddress: string
  position: string
  status: 'active' | 'inactive'
}

const storageKey = 'inventory-management-users'
const seed: InventoryUser[] = [
  {
    userId: 'i1',
    name: { given: 'Jamie', family: 'Taylor' },
    emailAddress: 'jamie@example.com',
    position: 'Stock manager',
    status: 'active',
  },
]

function load(): InventoryUser[] {
  const raw = localStorage.getItem(storageKey)
  if (raw === null) return structuredClone(seed)
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('Invalid stored user data')
  return parsed as InventoryUser[]
}

function save(records: InventoryUser[]): void {
  localStorage.setItem(storageKey, JSON.stringify(records))
}

function toUser(record: InventoryUser): User {
  return {
    id: record.userId,
    firstName: record.name.given,
    lastName: record.name.family,
    email: record.emailAddress,
    role: record.position,
    isActive: record.status === 'active',
  }
}

function fromUser(id: string, input: UserInput): InventoryUser {
  return {
    userId: id,
    name: { given: input.firstName, family: input.lastName },
    emailAddress: input.email,
    position: input.role,
    status: input.isActive ? 'active' : 'inactive',
  }
}

export class InventoryUserAdapter implements UserRepository {
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
    const index = records.findIndex((record) => record.userId === id)
    if (index === -1) throw new Error('User not found')
    const record = fromUser(id, input)
    records[index] = record
    save(records)
    return toUser(record)
  }

  async remove(id: string): Promise<void> {
    const records = load()
    const remaining = records.filter((record) => record.userId !== id)
    if (remaining.length === records.length) throw new Error('User not found')
    save(remaining)
  }
}
