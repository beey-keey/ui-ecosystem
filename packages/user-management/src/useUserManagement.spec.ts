import { describe, it, expect } from 'vitest'
import { useUserManagement } from './useUserManagement'
import { makeRepository, input, user, other } from './userManagementFixture'
import type { User } from '@ui-ecosystem/contracts'

describe('useUserManagement', () => {
  it('loads users', async () => {
    const repository = makeRepository()
    const state = useUserManagement(repository)
    expect(state.users.value).toEqual([])
    expect(await state.load()).toBe(true)
    expect(state.users.value).toEqual([user, other])
  })
  it('creates a user', async () => {
    const repository = makeRepository()
    const state = useUserManagement(repository)
    expect(await state.save(input)).toBe(true)
    expect(repository.create).toHaveBeenCalledWith(input)
    expect(state.users.value).toEqual([{ id: 'new', ...input }])
  })
  it('updates only the selected user', async () => {
    const repository = makeRepository()
    const state = useUserManagement(repository)
    await state.load()
    const changed = { ...input, isActive: false }
    expect(await state.save(changed, user.id)).toBe(true)
    expect(repository.update).toHaveBeenCalledWith(user.id, changed)
    expect(state.users.value).toEqual([{ id: user.id, ...changed }, other])
  })
  it('removes the selected user', async () => {
    const repository = makeRepository()
    const state = useUserManagement(repository)
    await state.load()
    expect(await state.remove(user.id)).toBe(true)
    expect(repository.remove).toHaveBeenCalledWith(user.id)
    expect(state.users.value).toEqual([other])
  })
  it('reports a load failure and recovers', async () => {
    const repository = makeRepository()
    repository.list.mockRejectedValueOnce(new Error('Load failed'))
    const state = useUserManagement(repository)
    expect(await state.load()).toBe(false)
    expect(state.error.value).toBe('Load failed')
    expect(state.busy.value).toBe(false)
    expect(await state.load()).toBe(true)
    expect(state.error.value).toBe('')
  })
  it('preserves users when saving fails', async () => {
    const repository = makeRepository()
    const state = useUserManagement(repository)
    await state.load()
    repository.update.mockRejectedValueOnce(new Error('Save failed'))
    expect(await state.save(input, user.id)).toBe(false)
    expect(state.users.value).toEqual([user, other])
    expect(state.error.value).toBe('Save failed')
  })
  it('handles non-Error rejection and preserves users', async () => {
    const repository = makeRepository()
    const state = useUserManagement(repository)
    await state.load()
    repository.remove.mockRejectedValueOnce('failure')
    expect(await state.remove(user.id)).toBe(false)
    expect(state.error.value).toBe('Operation failed.')
    expect(state.users.value).toEqual([user, other])
  })
  it('blocks concurrent operations while busy', async () => {
    const repository = makeRepository()
    let resolve!: (users: User[]) => void
    repository.list.mockReturnValueOnce(
      new Promise<User[]>((done) => {
        resolve = done
      }),
    )
    const state = useUserManagement(repository)
    const pending = state.load()
    expect(state.busy.value).toBe(true)
    expect(await state.save(input)).toBe(false)
    expect(repository.create).not.toHaveBeenCalled()
    resolve([user])
    expect(await pending).toBe(true)
    expect(state.busy.value).toBe(false)
  })
})
