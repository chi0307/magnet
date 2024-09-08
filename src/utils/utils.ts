import { v4 as uuidv4 } from 'uuid'
import typia from 'typia'

import { type UUID } from '../types/utils'

export function generateUuid(): UUID {
  const id = uuidv4()
  if (!typia.is<UUID>(id)) {
    throw new Error(`generate uuid is not UUID, ${id}`)
  }
  return id
}
