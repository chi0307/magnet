import { format } from 'date-fns'

import { Purchase } from '@/models/Purchase'
import { type PurchaseEntity } from '@/types/database'
import { type Transaction } from '@/types/utils'
import { localStorageManager } from '@/utils/StorageManager'

const groupedTransactions = (rawData: PurchaseEntity[]): Transaction[] => {
  const grouped = new Map<string, Transaction>()

  for (const { purchaseDate, name: description, amount } of rawData) {
    const date = format(purchaseDate, 'yyyy-MM-dd')
    const itemsByDate = grouped.get(date) ?? {
      date,
      items: [],
      total: 0,
    }

    itemsByDate.items.push({
      description,
      amount,
    })
    itemsByDate.total += amount
    grouped.set(date, itemsByDate)
  }

  return [...grouped.values()]
}

export async function fetchAllTransactions(): Promise<PurchaseEntity[]> {
  const purchaseModel = new Purchase()

  const savedUserId = localStorageManager.get('userId')

  if (savedUserId !== null) {
    const allTransactions = await purchaseModel.findAll()

    return [...allTransactions]
  }

  return []
}

export async function fetchGroupedTransactions(): Promise<Transaction[]> {
  const transactions = await fetchAllTransactions()

  return groupedTransactions(transactions)
}
