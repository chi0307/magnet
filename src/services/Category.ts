import { Category } from '@/models/Category'
import { type LedgerEntity, type CategoryEntity } from '@/types/database'

const categoryModel = new Category()

/**
 * sorting:
 * 1. sort_index big -> small
 * 2. created_at old -> new
 */
export async function getCategories(
  ledgerId: LedgerEntity['id']
): Promise<readonly Readonly<CategoryEntity>[]> {
  const categories = await categoryModel.findByLedgerId(ledgerId)

  return [...categories].sort(
    (aItem, bItem) =>
      bItem.sortIndex - aItem.sortIndex ||
      (aItem.createdAt > bItem.createdAt ? 1 : -1)
  )
}
