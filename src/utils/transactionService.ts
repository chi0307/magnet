import { Purchase } from '@/models/Purchase'
import { type PurchaseEntity } from '@/types/database'
import { type Transaction } from '@/types/utils'
import { isUuid } from '@/utils/checkTyping'
import { localStorageManager } from '@/utils/StorageManager'

const groupedTransactions = (rawData: PurchaseEntity[]): Transaction[] => {
  const grouped: { [key: string]: Transaction } = {}

  rawData.forEach((transaction) => {
    const date = new Date(transaction.purchaseDate).toISOString().split('T')[0] // Format date as YYYY-MM-DD
    const description = transaction.name
    const amount = transaction.amount

    // Use hasOwnProperty to check if the key exists
    if (!Object.prototype.hasOwnProperty.call(grouped, date)) {
      grouped[date] = {
        date,
        items: [],
        total: 0,
      }
    }

    grouped[date].items.push({ description, amount })
    grouped[date].total += amount
  })

  // Convert the grouped object to an array
  return Object.values(grouped)
}

export async function fetchAllTransactions(): Promise<PurchaseEntity[]> {
  const purchaseModel = new Purchase()

  const savedUserId = localStorageManager.get('userId')

  if (isUuid(savedUserId)) {
    const allTransactions = await purchaseModel.findAll()

    return [...allTransactions]
  }

  return []
}

export async function fetchGroupedTransactions(): Promise<Transaction[]> {
  const transactions = await fetchAllTransactions()

  return groupedTransactions(transactions)
}
