import { type CategoryEntity } from '../types/database'
import { type UUID } from '../types/utils'
import { BaseTable } from './BaseTable'

export class Category extends BaseTable<CategoryEntity> {
  private ledgerId: UUID
  public constructor(ledgerId: UUID) {
    super('category')
    this.ledgerId = ledgerId
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
      .filter((item) => item.ledgerId === this.ledgerId)
      .toArray()
    return categories.sort(
      (aItem, bItem) =>
        bItem.sortIndex - aItem.sortIndex ||
        (aItem.createdAt > bItem.createdAt ? 1 : -1)
    )
  }
}
