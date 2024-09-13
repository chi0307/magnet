import { BaseTable } from './BaseTable'

export class Purchase extends BaseTable<'purchase'> {
  public constructor() {
    super('purchase')
  }
}
