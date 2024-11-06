import { v7 as uuidv7 } from 'uuid'

import { getAllPurchases } from '@/services/Purchase'
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

export type CalculationType = 'expense' | 'income'

export function calculateTotal(
  transactions: Awaited<ReturnType<typeof getAllPurchases>>,
  type: CalculationType
): number {
  return transactions
    .filter((item) => (type === 'income' ? item.amount > 0 : item.amount < 0))
    .reduce((total, item) => total + item.amount, 0)
}
