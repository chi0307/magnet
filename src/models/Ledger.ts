import { type LedgerEntity } from '../types/database'
import { BaseTable } from './BaseTable'

export class Ledger extends BaseTable<LedgerEntity> {
  public constructor() {
    super('ledger')
  }
}
