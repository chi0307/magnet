import { BaseTable } from './BaseTable'

export class LedgerTable extends BaseTable<'ledgerInfo'> {
  public constructor() {
    super('ledgerInfo')
  }
}
