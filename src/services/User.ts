import { User } from '@/models/User'
import { createBook } from '@/services/Book'
import { type UserEntity } from '@/types/database'
import { getCurrency } from '@/utils/CurrencyManager'

const userModel = new User()

export async function signInOrRegisterUser({
  name,
  email,
}: {
  name: string
  email: string
}): Promise<UserEntity['id']> {
  const existingUser = await userModel.findByEmail(email)
  if (existingUser !== null) {
    return existingUser.id
  }

  const userId = await userModel.insert({
    name,
    email,
  })
  if (userId === null) {
    throw new Error('insert user failed')
  }
  await createBook({
    userId,
    currency: getCurrency(),
    bookName: 'default',
  })

  return userId
}
