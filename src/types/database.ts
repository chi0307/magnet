import { type UUID } from './utils'

export interface AutoBaseEntity {
  id: UUID
  createdAt: Date
  updatedAt: Date
}

export interface UserInfoEntity extends AutoBaseEntity {
  name: string
  email: string
}

export interface LedgerInfoEntity extends AutoBaseEntity {
  name: string
  currency: string
  userInfoId: UserInfoEntity['id']
}

export interface CategoryInfoEntity extends AutoBaseEntity {
  ledgerInfoId: LedgerInfoEntity['id']
  name: string
  icon: string
  sortIndex: number
}

export interface PurchaseInfoEntity extends AutoBaseEntity {
  ledgerInfoId: LedgerInfoEntity['id']
  categoryInfoId: CategoryInfoEntity['id']
  name: string
  amount: number
  purchaseDate: Date
}
