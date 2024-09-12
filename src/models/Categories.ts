import { BaseTable } from './BaseTable'

export class CategoryTable extends BaseTable<'categoryInfo'> {
  public constructor() {
    super('categoryInfo')
  }
}
