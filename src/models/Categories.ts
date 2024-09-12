import { type CategoryInfoEntity } from '../types/database'
import { type UUID } from '../types/utils'
import { BaseTable } from './BaseTable'

export class CategoryTable extends BaseTable<'categoryInfo'> {
  private _ledgerId: UUID
  public constructor(ledgerId: UUID) {
    super('categoryInfo')
    this._ledgerId = ledgerId
  }

  /**
   * sorting:
   * 1. sort_index big -> small
   * 2. created_at old -> new
   */
  public override async findAll(): Promise<
    readonly Readonly<CategoryInfoEntity>[]
  > {
    const categories = await this.table
      .where({ ledgerId: this._ledgerId })
      .toArray()
    return categories.sort(
      (aItem, bItem) =>
        bItem.sortIndex - aItem.sortIndex ||
        (aItem.createdAt > bItem.createdAt ? 1 : -1)
    )
  }
}
