import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../IUsers.repository'

export class inMemoryUsersRepository implements IUsersRepository {
  public users: Prisma.UserCreateInput[] = []

  async findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    this.users.push(data)

    return data as User
  }
}
