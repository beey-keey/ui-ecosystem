import { describe, it, expect } from 'vitest'
import type { UserInput, UserRepository } from '../src/user'

export const sampleUser: UserInput = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  role: 'Tester',
  isActive: true,
}

export function runUserRepositoryContractTests(factory: () => UserRepository, storageKey: string) {
  describe('UserRepository contract', () => {
    it('lists initial users in the common format', async () => {
      const users = await factory().list()
      expect(users).toHaveLength(1)
      expect(users[0]).toEqual({
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        role: expect.any(String),
        isActive: expect.any(Boolean),
      })
    })
    it('creates and persists users with unique ids', async () => {
      const repo = factory()
      const first = await repo.create(sampleUser)
      const second = await repo.create(sampleUser)
      expect(first).toEqual({ ...sampleUser, id: expect.any(String) })
      expect(first.id).not.toBe(second.id)
      expect(await factory().list()).toContainEqual(first)
    })
    it('updates a user and preserves its id', async () => {
      const repo = factory()
      const user = await repo.create(sampleUser)
      const input = { ...sampleUser, firstName: 'Updated', isActive: false }
      const updated = await repo.update(user.id, input)
      expect(updated).toEqual({ ...input, id: user.id })
      expect(await factory().list()).toContainEqual(updated)
    })
    it('removes a user persistently', async () => {
      const repo = factory()
      const user = await repo.create(sampleUser)
      await repo.remove(user.id)
      expect(await factory().list()).not.toContainEqual(user)
    })
    it('rejects updates to unknown users', async () => {
      const repo = factory()
      const before = await repo.list()
      await expect(repo.update('missing', sampleUser)).rejects.toThrow('User not found')
      expect(await repo.list()).toEqual(before)
    })
    it('rejects removal of unknown users', async () => {
      const repo = factory()
      const before = await repo.list()
      await expect(repo.remove('missing')).rejects.toThrow('User not found')
      expect(await repo.list()).toEqual(before)
    })
    it('preserves an empty collection', async () => {
      localStorage.setItem(storageKey, '[]')
      expect(await factory().list()).toEqual([])
    })
    it('rejects malformed JSON', async () => {
      localStorage.setItem(storageKey, '{')
      await expect(factory().list()).rejects.toThrow(SyntaxError)
    })
    it('rejects non-array stored data', async () => {
      localStorage.setItem(storageKey, '{}')
      await expect(factory().list()).rejects.toThrow('Invalid stored user data')
    })
  })
}
