import { BaseTable } from './BaseTable'

class LedgerTable extends BaseTable<'ledgerInfo'> {
  public constructor() {
    super('ledgerInfo')
  }
}

export const Ledgers = new LedgerTable()
