import typia from 'typia'
import { type Locale } from './locale'
import { type Currency } from './CurrencyManager'

class StorageManager<StorageTyping extends Record<string, unknown>> {
  private readonly storage: Storage
  private readonly typeChecker: TypeChecker<StorageTyping>

  public constructor(
    storage: Storage,
    typeChecker: TypeChecker<StorageTyping>
  ) {
    this.storage = storage
    this.typeChecker = typeChecker
  }

  public get<Key extends Extract<keyof StorageTyping, string>>(
    key: Key
  ): StorageTyping[Key] | null {
    const sourceData = this.storage.getItem(key)
    if (sourceData === null) {
      return null
    }
    try {
      const data: unknown = JSON.parse(sourceData)
      if (this.typeChecker[key](data)) {
        return data
      }
    } catch {
      // when JSON parse to remove local storage value
      this.remove(key)
    }
    return null
  }

  public set<Key extends Extract<keyof StorageTyping, string>>(
    key: Key,
    value: StorageTyping[Key]
  ): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  public remove<Key extends Extract<keyof StorageTyping, string>>(
    key: Key
  ): void {
    this.storage.removeItem(key)
  }
}

type TypeChecker<StorageTyping> = {
  [key in keyof StorageTyping]: (data: unknown) => data is StorageTyping[key]
}

// using 'typia.createIs<Your type>()' is necessary, can not use 'typia.is<Your type>'
export const localStorageManager = new StorageManager<{
  locale: Locale
  loginMethod: string
  currency: Currency
}>(localStorage, {
  locale: typia.createIs<Locale>(),
  loginMethod: typia.createIs<string>(),
  currency: typia.createIs<Currency>(),
})
