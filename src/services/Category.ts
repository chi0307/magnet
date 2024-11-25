import { defaultCategories } from '@/constant/defaultCategories'
import { Category } from '@/models/Category'
import { type CategoryEntity } from '@/types/database'
import { type RequiredEntity } from '@/types/utils'

const categoryModel = new Category()

export async function createCategory(
  item: RequiredEntity<CategoryEntity>,
): Promise<CategoryEntity['id']> {
  const categoryId = await categoryModel.insert(item)
  if (categoryId === null) {
    throw new Error('create category failed')
  }
  return categoryId
}

export async function createDefaultCategories(
  bookId: CategoryEntity['bookId'],
): Promise<CategoryEntity['id'][]> {
  const newCategories: RequiredEntity<CategoryEntity>[] = defaultCategories.map((item) => ({
    ...item,
    bookId,
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
  bookId: CategoryEntity['bookId'],
): Promise<readonly Readonly<CategoryEntity>[]> {
  const categories = await categoryModel.findByBookId(bookId)

  return [...categories].sort(
    (aItem, bItem) =>
      bItem.sortIndex - aItem.sortIndex || (aItem.createdAt > bItem.createdAt ? 1 : -1),
  )
}
