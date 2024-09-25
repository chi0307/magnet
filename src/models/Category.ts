import { BaseTable } from '@/models/BaseTable'
import { type CategoryEntity } from '@/types/database'

export class Category extends BaseTable<CategoryEntity> {
  public constructor() {
    super('category')
  }
}
