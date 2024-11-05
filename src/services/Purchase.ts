import { Purchase } from '@/models/Purchase'
import { getDefaultLedger } from '@/services/Ledger'
import { PurchaseEntity } from '@/types/database'
import { localStorageManager } from '@/utils/StorageManager'

export async function getAllPurchases(): Promise<
  readonly Readonly<PurchaseEntity>[]
> {
  const purchaseModel = new Purchase()
  const userId = localStorageManager.get('userId')
  if (userId === null) {
    return []
  }
  const ledger = await getDefaultLedger()
  const purchases = await purchaseModel.findByLedgerId(ledger.id)
  return purchases
}
