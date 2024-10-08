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
    name: t('ledger.category.breakfast'),
    sortIndex: 15,
  },
  {
    icon: 'lunch',
    name: t('ledger.category.lunch'),
    sortIndex: 14,
  },
  { icon: 'dinner', name: t('ledger.category.dinner'), sortIndex: 13 },
  { icon: 'drinks', name: t('ledger.category.drinks'), sortIndex: 12 },
  { icon: 'housing', name: t('ledger.category.housing'), sortIndex: 11 },
  { icon: 'desert', name: t('ledger.category.desert'), sortIndex: 10 },
  {
    icon: 'shopping',
    name: t('ledger.category.shopping'),
    sortIndex: 9,
  },
  { icon: 'socialize', name: t('ledger.category.socialize'), sortIndex: 8 },
  { icon: 'rent', name: t('ledger.category.rent'), sortIndex: 7 },
  {
    icon: 'bill',
    name: t('ledger.category.bill'),
    sortIndex: 6,
  },
  { icon: 'traffic', name: t('ledger.category.traffic'), sortIndex: 5 },
  { icon: 'ent', name: t('ledger.category.ent'), sortIndex: 4 },
  {
    icon: 'medical',
    name: t('ledger.category.medical'),
    sortIndex: 3,
  },
  { icon: 'gift', name: t('ledger.category.gift'), sortIndex: 2 },
  { icon: 'other', name: t('ledger.category.other'), sortIndex: 1 },
]
