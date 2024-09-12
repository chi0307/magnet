import { type UserEntity } from '../types/database'
import { BaseTable } from './BaseTable'

export class UserTable extends BaseTable<'user'> {
  public constructor() {
    super('user')
  }

  public async findByEmail(
    email: UserEntity['email']
  ): Promise<Readonly<UserEntity> | null> {
    return (await this.table.where({ email }).first()) ?? null
  }
}
