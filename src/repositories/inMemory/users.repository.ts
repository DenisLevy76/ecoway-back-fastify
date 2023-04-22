import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../IUsers.repository'
import crypto from 'node:crypto'

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      avatar: '',
      created_at: new Date(),
      password_hash: data.password_hash,
    }

    this.users.push(user)

    return user
  }
}
