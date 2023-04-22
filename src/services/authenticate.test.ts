import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate.service'
import { InMemoryUsersRepository } from '@/repositories/inMemory/users.repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentials.error'

let inMemoryRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticatevice', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(inMemoryRepository)
  })

  it('should be able to authenticate a user', async () => {
    await inMemoryRepository.create({
      email: 'test@test.com.br',
      name: 'test',
      password_hash: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'test@test.com.br',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a user with wrong email.', async () => {
    await inMemoryRepository.create({
      email: 'test@test.com.br',
      name: 'test',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    await inMemoryRepository.create({
      email: 'test@test.com.br',
      name: 'test',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'test@test.com.br',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
