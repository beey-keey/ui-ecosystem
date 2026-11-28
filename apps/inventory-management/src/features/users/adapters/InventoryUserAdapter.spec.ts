import { describe, it, expect } from 'vitest'
import {
  runUserRepositoryContractTests,
  sampleUser,
} from '../../../../../../packages/contracts/tests/userRepositoryContract'
import { InventoryUserAdapter } from './InventoryUserAdapter'

const storageKey = 'inventory-management-users'

describe('InventoryUserAdapter', () => {
  runUserRepositoryContractTests(() => new InventoryUserAdapter(), storageKey)

  it('persists the native application model', async () => {
    const repo = new InventoryUserAdapter()
    const user = await repo.create(sampleUser)
    await repo.update(user.id, { ...sampleUser, isActive: false })
    expect(JSON.parse(localStorage.getItem(storageKey) ?? '[]')).toContainEqual({
      userId: user.id,
      name: { given: sampleUser.firstName, family: sampleUser.lastName },
      emailAddress: sampleUser.email,
      position: sampleUser.role,
      status: 'inactive',
    })
  })
})
