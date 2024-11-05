import { Icon } from '@/constant/icons'
import { Purchase } from '@/models/Purchase'
import { getCategories } from '@/services/Category'
import { getDefaultLedger } from '@/services/Ledger'
import { PurchaseEntity } from '@/types/database'
import { localStorageManager } from '@/utils/StorageManager'

export async function getAllPurchases(): Promise<
  readonly Readonly<PurchaseEntity & { icon: Icon }>[]
> {
  const purchaseModel = new Purchase()
  const userId = localStorageManager.get('userId')
  if (userId === null) {
    return []
  }
  const ledger = await getDefaultLedger()
  const purchases = await purchaseModel.findByLedgerId(ledger.id)
  const iconMapping = new Map(
    [...(await getCategories(ledger.id))].map((item) => [item.id, item.icon])
  )

  return purchases.map((item) => {
    return {
      ...item,
      icon: iconMapping.get(item.categoryId) ?? 'error',
    }
  })
}
