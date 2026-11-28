import { ref } from 'vue'
import type { User, UserInput, UserRepository } from '@ui-ecosystem/contracts'

export function useUserManagement(repository: UserRepository) {
  const users = ref<User[]>([])
  const busy = ref(false)
  const error = ref('')
  async function run(action: () => Promise<void>): Promise<boolean> {
    if (busy.value) return false
    busy.value = true
    error.value = ''
    try {
      await action()
      return true
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Operation failed.'
      return false
    } finally {
      busy.value = false
    }
  }
  const load = () =>
    run(async () => {
      users.value = await repository.list()
    })
  const save = (input: UserInput, id?: string) =>
    run(async () => {
      if (id === undefined) users.value.push(await repository.create(input))
      else {
        const updated = await repository.update(id, input)
        users.value = users.value.map((user) => (user.id === id ? updated : user))
      }
    })
  const remove = (id: string) =>
    run(async () => {
      await repository.remove(id)
      users.value = users.value.filter((user) => user.id !== id)
    })
  return { users, busy, error, load, save, remove }
}
