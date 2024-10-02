import { BaseTable } from '@/models/BaseTable'
import { type LedgerEntity } from '@/types/database'

export class Ledger extends BaseTable<LedgerEntity> {
  public constructor() {
    super('ledger')
  }

  public async findByUserId(
    userId: LedgerEntity['id']
  ): Promise<Readonly<LedgerEntity> | null> {
    return (await this.table.where({ userId }).first()) ?? null
  }
}
