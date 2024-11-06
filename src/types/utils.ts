import { IconType } from 'react-icons'

import { type AutoBaseEntity } from '@/types/database'

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export type TableName<Entity extends AutoBaseEntity, TableSchema> = {
  [K in keyof TableSchema]: TableSchema[K] extends Entity ? K : never
}[keyof TableSchema]
export type RequiredEntity<Entity extends AutoBaseEntity> = Omit<
  Entity,
  keyof AutoBaseEntity
>

export interface Transaction {
  date: string
  items: { description: string; amount: number; icon: IconType }[]
  total: number
}
