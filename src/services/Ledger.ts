import { defaultCategories } from '@/constant/defaultCategories'
import { Ledger } from '@/models/Ledger'
import { createCategories } from '@/services/Category'
import { type LedgerEntity } from '@/types/database'
import { type Currency } from '@/utils/CurrencyManager'

const ledgerModel = new Ledger()

export async function createLedger({
  userId,
  ledgerName,
  currency,
}: {
  userId: LedgerEntity['userId']
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

  await createCategories(ledgerId, defaultCategories)

  return ledgerId
}
