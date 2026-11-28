import { vi } from 'vitest'
import type { User, UserInput, UserRepository } from '@ui-ecosystem/contracts'

export const input: UserInput = {
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex@example.com',
  role: 'Manager',
  isActive: true,
}
export const user: User = { id: 'u1', ...input }
export const other: User = {
  id: 'u2',
  firstName: 'Jamie',
  lastName: 'Taylor',
  email: 'jamie@example.com',
  role: 'Editor',
  isActive: false,
}
export function makeRepository() {
  return {
    list: vi.fn<UserRepository['list']>().mockResolvedValue([{ ...user }, { ...other }]),
    create: vi
      .fn<UserRepository['create']>()
      .mockImplementation(async (data) => ({ id: 'new', ...data })),
    update: vi
      .fn<UserRepository['update']>()
      .mockImplementation(async (id, data) => ({ id, ...data })),
    remove: vi.fn<UserRepository['remove']>().mockResolvedValue(undefined),
  }
}
