import { t } from 'i18next'

import { type Icon } from '@/constant/icons'

interface DefaultCategory {
  icon: Icon
  name: string
  sortIndex: number
  type: 'expense' | 'income'
}

export const expenseCategories: DefaultCategory[] = [
  {
    icon: 'breakfast',
    name: t('book.category.breakfast'),
    sortIndex: 15,
    type: 'expense',
  },
  {
    icon: 'lunch',
    name: t('book.category.lunch'),
    sortIndex: 14,
    type: 'expense',
  },
  {
    icon: 'dinner',
    name: t('book.category.dinner'),
    sortIndex: 13,
    type: 'expense',
  },
  {
    icon: 'drinks',
    name: t('book.category.drinks'),
    sortIndex: 12,
    type: 'expense',
  },
  {
    icon: 'housing',
    name: t('book.category.housing'),
    sortIndex: 11,
    type: 'expense',
  },
  {
    icon: 'desert',
    name: t('book.category.desert'),
    sortIndex: 10,
    type: 'expense',
  },
  {
    icon: 'shopping',
    name: t('book.category.shopping'),
    sortIndex: 9,
    type: 'expense',
  },
  {
    icon: 'socialize',
    name: t('book.category.socialize'),
    sortIndex: 8,
    type: 'expense',
  },
  {
    icon: 'rent',
    name: t('book.category.rent'),
    sortIndex: 7,
    type: 'expense',
  },
  {
    icon: 'bill',
    name: t('book.category.bill'),
    sortIndex: 6,
    type: 'expense',
  },
  {
    icon: 'traffic',
    name: t('book.category.traffic'),
    sortIndex: 5,
    type: 'expense',
  },
  {
    icon: 'entertainment',
    name: t('book.category.entertainment'),
    sortIndex: 4,
    type: 'expense',
  },
  {
    icon: 'medical',
    name: t('book.category.medical'),
    sortIndex: 3,
    type: 'expense',
  },
  {
    icon: 'gift',
    name: t('book.category.gift'),
    sortIndex: 2,
    type: 'expense',
  },
  {
    icon: 'other',
    name: t('book.category.other'),
    sortIndex: 1,
    type: 'expense',
  },
]

export const incomeCategories: DefaultCategory[] = [
  {
    icon: 'deposit',
    name: t('book.category.deposit'),
    sortIndex: 6,
    type: 'income',
  },
  {
    icon: 'salary',
    name: t('book.category.salary'),
    sortIndex: 5,
    type: 'income',
  },
  {
    icon: 'other',
    name: t('book.category.other'),
    sortIndex: 4,
    type: 'income',
  },
  {
    icon: 'gift',
    name: t('book.category.gift'),
    sortIndex: 3,
    type: 'income',
  },
  {
    icon: 'interest',
    name: t('book.category.interest'),
    sortIndex: 2,
    type: 'income',
  },
  {
    icon: 'stock',
    name: t('book.category.stock'),
    sortIndex: 1,
    type: 'income',
  },
]
