import { BaseTable } from '@/models/BaseTable'
import { type BookEntity as BookEntity } from '@/types/database'

export class Book extends BaseTable<BookEntity> {
  public constructor() {
    super('book')
  }

  public async findByUserId(
    userId: BookEntity['userId']
  ): Promise<Readonly<BookEntity> | null> {
    return (await this.table.where({ userId }).first()) ?? null
  }

  public async findByName(
    name: BookEntity['name']
  ): Promise<Readonly<BookEntity> | null> {
    return (await this.table.where({ name }).first()) ?? null
  }
}
