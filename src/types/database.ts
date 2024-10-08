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

export interface LedgerEntity extends AutoBaseEntity {
  name: string
  currency: string
  userId: UserEntity['id']
}

export interface CategoryEntity extends AutoBaseEntity {
  ledgerId: LedgerEntity['id']
  name: string
  // 不確定寫 Icon type 好不好，可以討論，但我覺得型別寫強一點比較好
  icon: Icon
  sortIndex: number
}

export interface PurchaseEntity extends AutoBaseEntity {
  ledgerId: LedgerEntity['id']
  categoryId: CategoryEntity['id']
  name: string
  amount: number
  purchaseDate: Date
}
