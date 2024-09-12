import { BaseTable } from './BaseTable'

export class LedgerTable extends BaseTable<'ledger'> {
  public constructor() {
    super('ledger')
  }
}
