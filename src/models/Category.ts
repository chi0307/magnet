import { BaseTable } from '@/models/BaseTable'
import { type CategoryEntity } from '@/types/database'

export class Category extends BaseTable<CategoryEntity> {
  public constructor() {
    super('category')
  }

  public async findByBookId(
    bookId: CategoryEntity['bookId'],
  ): Promise<readonly Readonly<CategoryEntity>[]> {
    return this.table.where({ bookId }).toArray()
  }
}
