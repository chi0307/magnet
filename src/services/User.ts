import { Ledger } from '@/models/Ledger'
import { User } from '@/models/User'
import { type UserEntity } from '@/types/database'
import { getCurrency } from '@/utils/CurrencyManager'

const userModel = new User()
const ledgerModel = new Ledger()

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
  await ledgerModel.insert({
    name: 'default',
    currency: getCurrency(),
    userId,
  })

  return userId
}
