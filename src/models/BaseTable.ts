import Dexie, { type UpdateSpec, type Table } from 'dexie'

import {
  type UserEntity,
  type BookEntity,
  type CategoryEntity,
  type TransactionEntity,
} from '@/types/database'
import { type RequiredEntity, type TableName, type UUID } from '@/types/utils'
import { errorHandle, generateUuid, uniqueArray } from '@/utils'

interface TableSchema {
  user: UserEntity
  book: BookEntity
  category: CategoryEntity
  transaction: TransactionEntity
}

const tableIndexes: {
  [key in keyof TableSchema]: (keyof TableSchema[key])[]
} = {
  user: ['id', 'email'],
  book: ['id', 'userId', 'name'],
  category: ['id', 'bookId'],
  transaction: ['id', 'bookId', 'categoryId'],
}

const db = new Dexie('MagnetDB')
// TODO: 需要想一下要怎麼兼容多個版本，文件是建議保留所有版本下來，但同時也包含了每個版本的 entity 感覺頗麻煩的
// https://dexie.org/docs/Tutorial/Design#database-versioning
db.version(1).stores(
  Object.fromEntries(
    Object.entries(tableIndexes).map(([key, value]) => [key, uniqueArray(value).join(',')]),
  ),
)

export class BaseTable<Entity extends TableSchema[keyof TableSchema]> {
  protected db = db
  private tableName: TableName<Entity, TableSchema>
  public constructor(tableName: TableName<Entity, TableSchema>) {
    this.tableName = tableName
    this.table.hook('creating', (_primKey: UUID, obj: Entity) => {
      // 目前這邊實作了 AutoBaseEntity 的資訊，這樣在 insert 的時候可以不用多寫這些資訊，所以 AutoBaseEntity 如果有改這邊也需要調整（因為沒有 typing check，所以需要特別注意）
      obj.id = generateUuid()
      obj.createdAt = new Date()
      obj.updatedAt = new Date()
    })
    this.table.hook('updating', () => {
      return { updatedAt: new Date() }
    })
  }

  protected get table(): Table<Entity, UUID, RequiredEntity<Entity>> {
    return this.db.table<Entity, UUID, RequiredEntity<Entity>>(this.tableName)
  }

  public async findAll(): Promise<readonly Readonly<Entity>[]> {
    return this.table.toArray()
  }

  public async findById(id: UUID): Promise<Readonly<Entity> | null> {
    return (await this.table.get(id)) ?? null
  }

  public async insert(entity: RequiredEntity<Entity>): Promise<UUID | null> {
    try {
      return await this.table.add(entity)
    } catch (error) {
      errorHandle('database insert failed', { error, entity })
      return null
    }
  }

  public async insertMany(entities: RequiredEntity<Entity>[]): Promise<UUID[] | null> {
    try {
      return await this.table.bulkAdd(entities, { allKeys: true })
    } catch (error) {
      errorHandle(`database insert many failed`, { error, entities })
      return null
    }
  }

  public async update(id: UUID, entity: UpdateSpec<RequiredEntity<Entity>>): Promise<boolean> {
    return (await this.table.update(id, entity)) === 1
  }

  public async delete(id: UUID): Promise<boolean> {
    try {
      await this.table.delete(id)
      return true
    } catch (error) {
      errorHandle(`database delete ${id} failed`, { error })
      return false
    }
  }
}
