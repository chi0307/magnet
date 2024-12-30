import { isRouteErrorResponse } from 'react-router'
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

export function errorHandle(
  message: string,
  {
    error = null,
    type = 'error',
    ...otherData
  }: {
    error?: unknown
    type?: 'error' | 'alert'
    [key: string]: unknown
  } = {},
): void {
  let outputMessage = message
  if (error !== null && error instanceof Error) {
    outputMessage = `${message}, error: ${error.message}`
  } else if (isRouteErrorResponse(error)) {
    outputMessage = `${message}, status: ${error.status}, statusText: ${error.statusText}, data: ${error.data}`
  } else if (error !== null) {
    outputMessage = `${message}, unknown: ${JSON.stringify(error)}`
  }
  switch (type) {
    case 'error': {
      console.error(outputMessage, otherData)
      break
    }
    case 'alert': {
      console.error(otherData)
      alert(outputMessage)
      break
    }
  }
}
