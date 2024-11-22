import { BaseTable } from '@/models/BaseTable'
import { type UserEntity } from '@/types/database'

export class User extends BaseTable<UserEntity> {
  public constructor() {
    super('user')
  }

  public async findByEmail(email: UserEntity['email']): Promise<Readonly<UserEntity> | null> {
    return (await this.table.where({ email }).first()) ?? null
  }
}
