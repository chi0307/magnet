import { t } from 'i18next'

import { type Icon } from '@/constant/icons'

interface DefaultCategory {
  icon: Icon
  name: string
  sortIndex: number
}

export const defaultCategories: DefaultCategory[] = [
  {
    icon: 'breakfast',
    name: t('book.category.breakfast'),
    sortIndex: 15,
  },
  {
    icon: 'lunch',
    name: t('book.category.lunch'),
    sortIndex: 14,
  },
  { icon: 'dinner', name: t('book.category.dinner'), sortIndex: 13 },
  { icon: 'drinks', name: t('book.category.drinks'), sortIndex: 12 },
  { icon: 'housing', name: t('book.category.housing'), sortIndex: 11 },
  { icon: 'desert', name: t('book.category.desert'), sortIndex: 10 },
  {
    icon: 'shopping',
    name: t('book.category.shopping'),
    sortIndex: 9,
  },
  { icon: 'socialize', name: t('book.category.socialize'), sortIndex: 8 },
  { icon: 'rent', name: t('book.category.rent'), sortIndex: 7 },
  {
    icon: 'bill',
    name: t('book.category.bill'),
    sortIndex: 6,
  },
  { icon: 'traffic', name: t('book.category.traffic'), sortIndex: 5 },
  { icon: 'ent', name: t('book.category.ent'), sortIndex: 4 },
  {
    icon: 'medical',
    name: t('book.category.medical'),
    sortIndex: 3,
  },
  { icon: 'gift', name: t('book.category.gift'), sortIndex: 2 },
  { icon: 'other', name: t('book.category.other'), sortIndex: 1 },
]
