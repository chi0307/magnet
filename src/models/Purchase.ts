import { BaseTable } from '@/models/BaseTable'
import { type PurchaseEntity } from '@/types/database'

export class Purchase extends BaseTable<PurchaseEntity> {
  public constructor() {
    super('purchase')
  }

  // TODO: 這邊要想一下 find 有沒有需要可以透過名稱馬上知道是取得一個還是 array
  public async findByLedgerId(
    ledgerId: PurchaseEntity['ledgerId']
  ): Promise<readonly Readonly<PurchaseEntity>[]> {
    return this.table.where({ ledgerId }).toArray()
  }
}
