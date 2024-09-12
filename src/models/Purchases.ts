import { BaseTable } from './BaseTable'

export class PurchaseTable extends BaseTable<'purchaseInfo'> {
  public constructor() {
    super('purchaseInfo')
  }
}
