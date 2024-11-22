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

export function errorEvent(
  message: string,
  {
    error = null,
    type = 'console.error'
  }: {
    error?: unknown
    type?: 'console.error' | 'alert'
  } = {}
): void {
  const event: (text: string) => void = type === 'console.error' ? console.error : alert
  if (error === null) {
    event(message)
  } else if (error instanceof Error) {
    event(`${message}, error: ${error.message}`)
  } else {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    event(`${message}, unknown: ${error}`)
  }
}