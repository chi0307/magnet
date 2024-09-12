import { type CategoryEntity } from '../types/database'
import { type UUID } from '../types/utils'
import { BaseTable } from './BaseTable'

export class CategoryTable extends BaseTable<'category'> {
  private _ledgerId: UUID
  public constructor(ledgerId: UUID) {
    super('category')
    this._ledgerId = ledgerId
  }

  /**
   * sorting:
   * 1. sort_index big -> small
   * 2. created_at old -> new
   */
  public override async findAll(): Promise<
    readonly Readonly<CategoryEntity>[]
  > {
    const categories = await this.table
      .filter((item) => item.ledgerId === this._ledgerId)
      .toArray()
    return categories.sort(
      (aItem, bItem) =>
        bItem.sortIndex - aItem.sortIndex ||
        (aItem.createdAt > bItem.createdAt ? 1 : -1)
    )
  }
}
