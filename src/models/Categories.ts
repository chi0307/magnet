import { type CategoryInfoEntity } from '../types/database'
import { type UUID } from '../types/utils'
import { BaseTable } from './BaseTable'

export class CategoryTable extends BaseTable<'categoryInfo'> {
  private _ledgerId: UUID
  public constructor(ledgerId: UUID) {
    super('categoryInfo')
    this._ledgerId = ledgerId
  }

  public override async findAll(): Promise<CategoryInfoEntity[]> {
    return this.table.where({ ledgerId: this._ledgerId }).toArray()
  }
}
