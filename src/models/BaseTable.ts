import Dexie from 'dexie'
import { type UpdateSpec, type Table } from 'dexie'

import {
  type UserEntity,
  type LedgerEntity,
  type CategoryEntity,
  type PurchaseEntity,
} from '@/types/database'
import {
  type ExcludeAutoBaseEntity,
  type TableName,
  type UUID,
} from '@/types/utils'
import { generateUuid, uniqueArray } from '@/utils/utils'

interface TableSchema {
  user: UserEntity
  ledger: LedgerEntity
  category: CategoryEntity
  purchase: PurchaseEntity
}

const tableIndexes: {
  [key in keyof TableSchema]: (keyof TableSchema[key])[]
} = {
  user: ['id', 'email'],
  ledger: ['id', 'userId'],
  category: ['id', 'ledgerId'],
  purchase: ['id', 'ledgerId', 'categoryId'],
}

const db = new Dexie('MagnetDB')
db.version(1).stores(
  Object.fromEntries(
    Object.entries(tableIndexes).map(([key, value]) => [
      key,
      uniqueArray(value).join(','),
    ])
  )
)

export class BaseTable<Entity extends TableSchema[keyof TableSchema]> {
  protected db = db
  private tableName: TableName<Entity, TableSchema>
  public constructor(tableName: TableName<Entity, TableSchema>) {
    this.tableName = tableName
  }

  protected get table(): Table<Entity, UUID, ExcludeAutoBaseEntity<Entity>> {
    return this.db.table<Entity, UUID, ExcludeAutoBaseEntity<Entity>>(
      this.tableName
    )
  }

  public async findAll(): Promise<readonly Readonly<Entity>[]> {
    return this.table.toArray()
  }

  public async find(id: UUID): Promise<Readonly<Entity> | null> {
    return (await this.table.get(id)) ?? null
  }

  public async insert(
    item: ExcludeAutoBaseEntity<Entity>
  ): Promise<UUID | null> {
    try {
      // TODO: 之後 id, createdAt, updatedAt 搬移到 hook 裡面去可能會比較正確
      return await this.table.add({
        ...item,
        id: generateUuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public async update(
    id: UUID,
    item: UpdateSpec<ExcludeAutoBaseEntity<Entity>>
  ): Promise<boolean> {
    // TODO: 之後 updatedAt 搬移到 hook 裡面去可能會比較正確
    return (
      (await this.table.update(id, {
        ...item,
        updatedAt: new Date(),
      })) === 1
    )
  }

  public async delete(id: UUID): Promise<boolean> {
    try {
      await this.table.delete(id)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
