import { User } from '@/models/User'
import { checkDefaultBook } from '@/services/Book'
import { type UserEntity } from '@/types/database'
import { localStorageManager } from '@/utils/StorageManager'

const userModel = new User()

export async function signInOrRegisterUser({
  name,
  email,
}: {
  name: string
  email: string
}): Promise<UserEntity['id']> {
  const existingUser = await userModel.findByEmail(email)
  let userId = existingUser?.id ?? null
  if (userId === null) {
    userId = await userModel.insert({
      name,
      email,
    })
  }
  if (userId === null) {
    throw new Error('insert user failed')
  }
  await checkDefaultBook(userId)

  return userId
}

export async function checkUser(): Promise<boolean> {
  const userId = localStorageManager.get('userId')
  if (userId === null) {
    return false
  }
  const user = await userModel.findById(userId)
  if (user === null) {
    return false
  }
  try {
    await checkDefaultBook(user.id)
    return true
  } catch {
    return false
  }
}
