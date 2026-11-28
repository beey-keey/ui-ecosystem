import { describe, it, expect } from 'vitest'
import { TaskUserAdapter } from '../../../apps/task-management/src/features/users/adapters/TaskUserAdapter'
import { InventoryUserAdapter } from '../../../apps/inventory-management/src/features/users/adapters/InventoryUserAdapter'
import { sampleUser } from './userRepositoryContract'

describe('User adapter isolation', () => {
  it('keeps task and inventory data independent', async () => {
    const task = new TaskUserAdapter()
    const inventory = new InventoryUserAdapter()
    const initialTask = await task.list()
    const initialInventory = await inventory.list()
    const taskUser = await task.create(sampleUser)
    expect(await inventory.list()).toEqual(initialInventory)
    await inventory.create({ ...sampleUser, email: 'inventory@example.com' })
    expect(await task.list()).toEqual([...initialTask, taskUser])
    await task.remove(taskUser.id)
    expect(await inventory.list()).toHaveLength(initialInventory.length + 1)
  })
})
