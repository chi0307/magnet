import { BaseTable } from '@/models/BaseTable'
import { type LedgerEntity } from '@/types/database'

export class Ledger extends BaseTable<LedgerEntity> {
  public constructor() {
    super('ledger')
  }
}
