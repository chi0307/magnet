import { type UserInfoEntity } from '../types/database'
import { BaseTable } from './BaseTable'

class UserTable extends BaseTable<'userInfo'> {
  public constructor() {
    super('userInfo')
  }

  public async findByEmail(
    email: UserInfoEntity['email']
  ): Promise<UserInfoEntity | null> {
    return (await this.table.where({ email }).first()) ?? null
  }
}

export const Users = new UserTable()
