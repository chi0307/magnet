import { BaseTable } from './BaseTable'

class CategoryTable extends BaseTable<'categoryInfo'> {
  public constructor() {
    super('categoryInfo')
  }
}

export const Categories = new CategoryTable()
