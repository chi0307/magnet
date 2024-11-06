import { v7 as uuidv7 } from 'uuid'

import { type UUID } from '@/types/utils'
import { isUuid } from '@/utils/checkTyping'

export function generateUuid(): UUID {
  const id = uuidv7()
  if (!isUuid(id)) {
    throw new Error(`generate uuid is not UUID, ${id}`)
  }
  return id
}

export function uniqueArray<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}
