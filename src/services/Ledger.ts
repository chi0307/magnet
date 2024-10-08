import { Ledger } from '@/models/Ledger'
import { createCategories } from '@/services/Category'
import { type LedgerEntity } from '@/types/database'
import { type UUID } from '@/types/utils'
import { type Currency } from '@/utils/CurrencyManager'

const ledgerModel = new Ledger()

export async function createLedger({
  userId,
  ledgerName,
  currency,
}: {
  userId: UUID
  ledgerName: string
  currency: Currency
}): Promise<LedgerEntity['id']> {
  const ledgerId = await ledgerModel.insert({
    name: ledgerName,
    currency,
    userId,
  })

  if (ledgerId === null) {
    throw new Error('create ledger failed')
  }

  // TODO: 想一下這時候要怎麼把類別帶進來
  await createCategories(ledgerId, [])

  return ledgerId
}
