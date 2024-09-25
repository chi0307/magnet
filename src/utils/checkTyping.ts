import { createIs } from 'typia'

import { type UUID } from '@/types/utils'
import { type Currency } from '@/utils/CurrencyManager'
import { type Locale } from '@/utils/locale'

// using 'typia.createIs<Your type>()' is necessary, can not use 'typia.is<Your type>'
export const isLocale = createIs<Locale>()
export const isCurrency = createIs<Currency>()
export const isUuid = (data: unknown): data is UUID =>
  typeof data === 'string' &&
  /[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}/.test(data)
