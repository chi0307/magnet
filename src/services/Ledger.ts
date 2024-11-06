import { Ledger } from '@/models/Ledger'
import { createDefaultCategories } from '@/services/Category'
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

  await createDefaultCategories(ledgerId)

  return ledgerId
}

export async function getDefaultLedger(): Promise<Readonly<LedgerEntity>> {
  const ledger = await ledgerModel.findByName('default')
  if (ledger === null) {
    throw new Error('not found default ledger')
  }
  return ledger
}
