import { BaseTable } from '@/models/BaseTable'
import { type CategoryEntity } from '@/types/database'

export class Category extends BaseTable<CategoryEntity> {
  public constructor() {
    super('category')
  }

  public async findByLedgerId(
    ledgerId: CategoryEntity['ledgerId']
  ): Promise<readonly Readonly<CategoryEntity>[]> {
    return this.table.where({ ledgerId }).toArray()
  }
}
