import { BaseTable } from '@/models/BaseTable'
import { type TransactionEntity } from '@/types/database'

export class Transaction extends BaseTable<TransactionEntity> {
  public constructor() {
    super('transaction')
  }

  // TODO: 這邊要想一下 find 有沒有需要可以透過名稱馬上知道是取得一個還是 array
  public async findByBookId(
    bookId: TransactionEntity['bookId']
  ): Promise<readonly Readonly<TransactionEntity>[]> {
    return this.table.where({ bookId }).toArray()
  }
}
