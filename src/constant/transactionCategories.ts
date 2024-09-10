import { type IconType } from 'react-icons'
import { LiaBreadSliceSolid } from 'react-icons/lia'
import {
  MdOutlineLunchDining,
  MdOutlineLocalPlay,
  MdOutlineMedicalServices,
} from 'react-icons/md'
import { GiMeal } from 'react-icons/gi'
import {
  RiDrinksLine,
  RiMoneyDollarCircleLine,
  RiBusFill,
  RiFunctionLine,
} from 'react-icons/ri'
import { LuShoppingCart, LuCakeSlice } from 'react-icons/lu'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { GrGroup } from 'react-icons/gr'
import { IoHomeOutline } from 'react-icons/io5'
import { IoMdGift } from 'react-icons/io'
import { t } from 'i18next'

export interface ICategory {
  icon: IconType
  name: string
  sortIndex: number
}

export const expenseCategory: ICategory[] = [
  {
    icon: LiaBreadSliceSolid,
    name: t('ledger.category.breakfast'),
    sortIndex: 15,
  },
  {
    icon: MdOutlineLunchDining,
    name: t('ledger.category.lunch'),
    sortIndex: 14,
  },
  { icon: GiMeal, name: t('ledger.category.dinner'), sortIndex: 13 },
  { icon: RiDrinksLine, name: t('ledger.category.drinks'), sortIndex: 12 },
  { icon: LuShoppingCart, name: t('ledger.category.housing'), sortIndex: 11 },
  { icon: LuCakeSlice, name: t('ledger.category.desert'), sortIndex: 10 },
  {
    icon: HiOutlineShoppingBag,
    name: t('ledger.category.shopping'),
    sortIndex: 9,
  },
  { icon: GrGroup, name: t('ledger.category.socialize'), sortIndex: 8 },
  { icon: IoHomeOutline, name: t('ledger.category.rent'), sortIndex: 7 },
  {
    icon: RiMoneyDollarCircleLine,
    name: t('ledger.category.bill'),
    sortIndex: 6,
  },
  { icon: RiBusFill, name: t('ledger.category.traffic'), sortIndex: 5 },
  { icon: MdOutlineLocalPlay, name: t('ledger.category.ent'), sortIndex: 4 },
  {
    icon: MdOutlineMedicalServices,
    name: t('ledger.category.medical'),
    sortIndex: 3,
  },
  { icon: IoMdGift, name: t('ledger.category.gift'), sortIndex: 2 },
  { icon: RiFunctionLine, name: t('ledger.category.other'), sortIndex: 1 },
]

// TODO: Edit default income category
export const incomeCategory: ICategory[] = [
  { icon: LiaBreadSliceSolid, name: 'Breakfast', sortIndex: 15 },
  { icon: MdOutlineLunchDining, name: 'Lunch', sortIndex: 14 },
  { icon: GiMeal, name: 'Dinner', sortIndex: 13 },
  { icon: RiDrinksLine, name: 'Drinks', sortIndex: 12 },
  { icon: LuShoppingCart, name: 'Housing', sortIndex: 11 },
  { icon: LuCakeSlice, name: 'Desert', sortIndex: 10 },
  { icon: HiOutlineShoppingBag, name: 'Shopping', sortIndex: 9 },
  { icon: GrGroup, name: 'Socialize', sortIndex: 8 },
  { icon: IoHomeOutline, name: 'Rent', sortIndex: 7 },
  { icon: RiMoneyDollarCircleLine, name: 'Bill', sortIndex: 6 },
  { icon: RiBusFill, name: 'Traffic', sortIndex: 5 },
  { icon: MdOutlineLocalPlay, name: 'Ent', sortIndex: 4 },
  { icon: MdOutlineMedicalServices, name: 'Medical', sortIndex: 3 },
  { icon: IoMdGift, name: 'Gift', sortIndex: 2 },
  { icon: RiFunctionLine, name: 'Other', sortIndex: 1 },
]
