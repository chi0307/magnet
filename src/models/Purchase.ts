import { BaseTable } from '@/models/BaseTable'
import { type PurchaseEntity } from '@/types/database'

export class Purchase extends BaseTable<PurchaseEntity> {
  public constructor() {
    super('purchase')
  }
}
