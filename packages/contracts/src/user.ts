export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  isActive: boolean
}

export type UserInput = Omit<User, 'id'>

export interface UserRepository {
  list(): Promise<User[]>
  create(input: UserInput): Promise<User>
  update(id: string, input: UserInput): Promise<User>
  remove(id: string): Promise<void>
}
