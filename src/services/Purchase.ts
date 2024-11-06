import { Icon } from '@/constant/icons'
import { Purchase } from '@/models/Purchase'
import { getCategories } from '@/services/Category'
import { getDefaultLedger } from '@/services/Ledger'
import { PurchaseEntity } from '@/types/database'
import { localStorageManager } from '@/utils/StorageManager'

export async function getAllPurchases(): Promise<
  readonly Readonly<PurchaseEntity & { icon: Icon; categoryName: string }>[]
> {
  const purchaseModel = new Purchase()
  const userId = localStorageManager.get('userId')
  if (userId === null) {
    return []
  }
  const ledger = await getDefaultLedger()
  const purchases = await purchaseModel.findByLedgerId(ledger.id)
  const iconMapping = new Map(
    [...(await getCategories(ledger.id))].map((item) => [
      item.id,
      { icon: item.icon, name: item.name },
    ])
  )

  return purchases
    .map((item) => {
      return {
        ...item,
        icon: iconMapping.get(item.categoryId)?.icon ?? 'error',
        categoryName: iconMapping.get(item.categoryId)?.name ?? '',
      }
    })
    .sort((a, b) => (a.purchaseDate > b.purchaseDate ? -1 : 1))
}
