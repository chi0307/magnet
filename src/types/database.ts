import { type Icon } from '@/constant/icons'
import { type UUID } from '@/types/utils'

/**
 * 這個 Entity 如果調整的話，dexie hook 也要一併調整
 */
export interface AutoBaseEntity {
  id: UUID
  createdAt: Date
  updatedAt: Date
}

export interface UserEntity extends AutoBaseEntity {
  name: string
  email: string
}

export interface BookEntity extends AutoBaseEntity {
  name: string
  currency: string
  userId: UserEntity['id']
}

export interface CategoryEntity extends AutoBaseEntity {
  bookId: BookEntity['id']
  name: string
  icon: Icon
  sortIndex: number
  type: 'expense' | 'income'
}

export interface TransactionEntity extends AutoBaseEntity {
  bookId: BookEntity['id']
  categoryId: CategoryEntity['id']
  name: string | null
  amount: number
  transactionDate: Date
}
