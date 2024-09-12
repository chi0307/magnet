import Dexie from 'dexie'
import { type UpdateSpec, type Table } from 'dexie'
import {
  type UserInfoEntity,
  type AutoBaseEntity,
  type LedgerInfoEntity,
  type CategoryInfoEntity,
  type PurchaseInfoEntity,
} from '../types/database'
import { type UUID } from '../types/utils'
import { generateUuid } from '../utils/utils'

interface TableSchema {
  userInfo: UserInfoEntity
  ledgerInfo: LedgerInfoEntity
  categoryInfo: CategoryInfoEntity
  purchaseInfo: PurchaseInfoEntity
}

const tableIndexes: {
  [key in keyof TableSchema]: (keyof TableSchema[key])[]
} = {
  userInfo: ['id', 'email'],
  ledgerInfo: ['id', 'userInfoId'],
  categoryInfo: ['id', 'ledgerInfoId'],
  purchaseInfo: ['id', 'ledgerInfoId', 'categoryInfoId'],
}

const db = new Dexie('MagnetDB')
db.version(1).stores(
  Object.fromEntries(
    Object.entries(tableIndexes).map(([key, value]) => [key, value.join(',')])
  )
)

type ExcludeAutoBaseEntity<Entity> = Omit<Entity, keyof AutoBaseEntity>
export class BaseTable<TableName extends keyof TableSchema> {
  protected _db = db
  private _tableName: TableName
  public constructor(tableName: TableName) {
    this._tableName = tableName
  }

  protected get table(): Table<
    TableSchema[TableName],
    UUID,
    ExcludeAutoBaseEntity<TableSchema[TableName]>
  > {
    return this._db.table<
      TableSchema[TableName],
      UUID,
      ExcludeAutoBaseEntity<TableSchema[TableName]>
    >(this._tableName)
  }

  public async findAll(): Promise<readonly Readonly<TableSchema[TableName]>[]> {
    return this.table.toArray()
  }

  public async find(
    id: UUID
  ): Promise<Readonly<TableSchema[TableName]> | null> {
    return (await this.table.get(id)) ?? null
  }

  public async insert(
    item: ExcludeAutoBaseEntity<TableSchema[TableName]>
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
    item: UpdateSpec<ExcludeAutoBaseEntity<TableSchema[TableName]>>
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
