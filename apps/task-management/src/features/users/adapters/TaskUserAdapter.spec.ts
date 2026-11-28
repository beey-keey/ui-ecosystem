import { describe, it, expect } from 'vitest'
import {
  runUserRepositoryContractTests,
  sampleUser,
} from '../../../../../../packages/contracts/tests/userRepositoryContract'
import { TaskUserAdapter } from './TaskUserAdapter'

const storageKey = 'task-management-users'

describe('TaskUserAdapter', () => {
  runUserRepositoryContractTests(() => new TaskUserAdapter(), storageKey)

  it('persists the native application model', async () => {
    const repo = new TaskUserAdapter()
    const user = await repo.create(sampleUser)
    await repo.update(user.id, { ...sampleUser, isActive: false })
    expect(JSON.parse(localStorage.getItem(storageKey) ?? '[]')).toContainEqual({
      id: user.id,
      ...sampleUser,
      isActive: false,
    })
  })
})
