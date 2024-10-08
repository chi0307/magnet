import { type IconType } from 'react-icons'
import { GiMeal } from 'react-icons/gi'
import { GrGroup } from 'react-icons/gr'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { IoMdGift } from 'react-icons/io'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaBreadSliceSolid } from 'react-icons/lia'
import { LuShoppingCart, LuCakeSlice } from 'react-icons/lu'
import {
  MdOutlineLunchDining,
  MdOutlineLocalPlay,
  MdOutlineMedicalServices,
} from 'react-icons/md'
import {
  RiDrinksLine,
  RiMoneyDollarCircleLine,
  RiBusFill,
  RiFunctionLine,
} from 'react-icons/ri'

export const iconList = {
  breakfast: LiaBreadSliceSolid,
  lunch: MdOutlineLunchDining,
  dinner: GiMeal,
  drinks: RiDrinksLine,
  housing: LuShoppingCart,
  desert: LuCakeSlice,
  shopping: HiOutlineShoppingBag,
  socialize: GrGroup,
  rent: IoHomeOutline,
  bill: RiMoneyDollarCircleLine,
  traffic: RiBusFill,
  ent: MdOutlineLocalPlay,
  medical: MdOutlineMedicalServices,
  gift: IoMdGift,
  other: RiFunctionLine,
} as const satisfies Record<string, IconType>
export type Icon = keyof typeof iconList
