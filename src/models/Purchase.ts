import { type PurchaseEntity } from '../types/database'
import { BaseTable } from './BaseTable'

export class Purchase extends BaseTable<PurchaseEntity> {
  public constructor() {
    super('purchase')
  }
}
