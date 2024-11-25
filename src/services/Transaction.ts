import { Icon } from '@/constant/icons'
import { Transaction } from '@/models/Transaction'
import { getDefaultBook } from '@/services/Book'
import { getCategories } from '@/services/Category'
import { TransactionEntity } from '@/types/database'
import { localStorageManager } from '@/utils/StorageManager'

export async function getAllTransactions(): Promise<
  readonly Readonly<TransactionEntity & { icon: Icon; categoryName: string }>[]
> {
  const transactionModel = new Transaction()
  const userId = localStorageManager.get('userId')
  if (userId === null) {
    return []
  }
  const book = await getDefaultBook()
  const transactions = await transactionModel.findByBookId(book.id)
  const iconMapping = new Map(
    [...(await getCategories(book.id))].map((item) => [
      item.id,
      { icon: item.icon, name: item.name },
    ]),
  )

  return transactions
    .map((item) => {
      return {
        ...item,
        icon: iconMapping.get(item.categoryId)?.icon ?? 'error',
        categoryName: iconMapping.get(item.categoryId)?.name ?? '',
      }
    })
    .sort((a, b) => (a.transactionDate > b.transactionDate ? -1 : 1))
}
