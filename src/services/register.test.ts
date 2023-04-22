import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUserService } from './registerUser.service'
import { InMemoryUsersRepository } from '@/repositories/inMemory/users.repository'
import { EmailAlreadyExistsError } from './errors/emailAlreadyExists.error'

let registerService: RegisterUserService

describe('Register.service', () => {
  beforeEach(() => {
    registerService = new RegisterUserService(new InMemoryUsersRepository())
  })

  it('should be able to register a user', async () => {
    const { user } = await registerService.execute({
      email: 'test@test.com',
      name: 'test',
      password: '123456',
    })

    console.log(user)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should create a hash from user password upon registration', async () => {
    const { user } = await registerService.execute({
      email: 'test@test.com',
      name: 'test',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })

  it('should not be able to register with same email twice', async () => {
    await registerService.execute({
      email: 'test@test.com',
      name: 'test',
      password: '123456',
    })

    expect(
      async () =>
        await registerService.execute({
          email: 'test@test.com',
          name: 'test',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
