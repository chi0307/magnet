import { BaseTable } from './BaseTable'

class PurchaseTable extends BaseTable<'purchaseInfo'> {
  public constructor() {
    super('purchaseInfo')
  }
}

export const Purchases = new PurchaseTable()
