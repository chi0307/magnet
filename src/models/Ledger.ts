import { type LedgerEntity } from '@/types/database'
import { BaseTable } from '@/models/BaseTable'

export class Ledger extends BaseTable<LedgerEntity> {
  public constructor() {
    super('ledger')
  }
}
