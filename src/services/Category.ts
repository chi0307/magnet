import { Category } from '@/models/Category'
import { type LedgerEntity, type CategoryEntity } from '@/types/database'
import { type RequiredEntity } from '@/types/utils'

const categoryModel = new Category()

export async function createCategories(
  ledgerId: CategoryEntity['ledgerId'],
  list: Omit<RequiredEntity<CategoryEntity>, 'ledgerId'>[]
): Promise<CategoryEntity['id'][]> {
  const newCategories: RequiredEntity<CategoryEntity>[] = list.map((item) => ({
    ...item,
    ledgerId,
  }))
  const categoryIds = await categoryModel.insertMany(newCategories)
  if (categoryIds === null) {
    throw new Error('create categories failed')
  }
  return categoryIds
}

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
