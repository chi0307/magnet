import { type PurchaseEntity } from '@/types/database'
import { BaseTable } from '@/models/BaseTable'

export class Purchase extends BaseTable<PurchaseEntity> {
  public constructor() {
    super('purchase')
  }
}
