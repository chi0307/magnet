import { isLocale, type Locale } from './locale'

class StorageManager<StorageTyping extends Record<string, unknown>> {
  private readonly _storage: Storage
  private readonly _typeChecker: TypeChecker<StorageTyping>

  public constructor(
    storage: Storage,
    typeChecker: TypeChecker<StorageTyping>
  ) {
    this._storage = storage
    this._typeChecker = typeChecker
  }

  public get<Key extends Extract<keyof StorageTyping, string>>(
    key: Key
  ): StorageTyping[Key] | null {
    const sourceData = this._storage.getItem(key)
    if (sourceData === null) {
      return null
    }
    try {
      const data: unknown = JSON.parse(sourceData)
      if (this._typeChecker[key](data)) {
        return data
      }
    } finally {
      // when JSON parse to remove local storage value
      this.remove(key)
    }
    return null
  }

  public set<Key extends Extract<keyof StorageTyping, string>>(
    key: Key,
    value: StorageTyping[Key]
  ): void {
    this._storage.setItem(key, JSON.stringify(value))
  }

  public remove<Key extends Extract<keyof StorageTyping, string>>(
    key: Key
  ): void {
    this._storage.removeItem(key)
  }
}

type TypeChecker<StorageTyping> = {
  [key in keyof StorageTyping]: (data: unknown) => data is StorageTyping[key]
}

export const localStorageManager = new StorageManager<{
  locale: Locale
}>(localStorage, {
  locale: isLocale,
})
