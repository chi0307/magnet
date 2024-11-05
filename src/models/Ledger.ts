import { BaseTable } from '@/models/BaseTable'
import { type LedgerEntity } from '@/types/database'

export class Ledger extends BaseTable<LedgerEntity> {
  public constructor() {
    super('ledger')
  }

  public async findByUserId(
    userId: LedgerEntity['userId']
  ): Promise<Readonly<LedgerEntity> | null> {
    return (await this.table.where({ userId }).first()) ?? null
  }

  public async findByName(name: LedgerEntity['name']): Promise<Readonly<LedgerEntity> | null> {
    return (await this.table.where({name}).first()) ?? null
  }
}
