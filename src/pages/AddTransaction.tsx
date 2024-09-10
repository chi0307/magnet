import { type IconType } from 'react-icons'
import { IoAddCircleOutline } from 'react-icons/io5'
import { LiaBreadSliceSolid } from 'react-icons/lia'
import { MdOutlineLunchDining } from 'react-icons/md'
import { GiMeal } from 'react-icons/gi'
import { RiDrinksLine } from 'react-icons/ri'
import { LuShoppingCart } from 'react-icons/lu'
import { LuCakeSlice } from 'react-icons/lu'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { GrGroup } from 'react-icons/gr'
import { IoHomeOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { RiBusFill } from 'react-icons/ri'
import { MdOutlineMedicalServices } from 'react-icons/md'
import { IoMdGift } from 'react-icons/io'
import { RiFunctionLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { enUS, ja, zhHK, zhTW, type Locale as Lan } from 'date-fns/locale'
import dayjs from 'dayjs'
import { FaCaretLeft } from 'react-icons/fa6'
import { FaCaretRight } from 'react-icons/fa6'
import { type Locale, getLocale } from '../utils/locale'
import 'dayjs/locale/zh-tw'
import 'dayjs/locale/zh-hk'
import 'dayjs/locale/ja'
import 'dayjs/locale/en'
import weekday from 'dayjs/plugin/weekday'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Calculator from '../components/Calculator'

dayjs.extend(weekday)
dayjs.extend(localizedFormat)

interface Category {
  icon: IconType
  name: string
  sortIndex: number
}

const categories: Category[] = [
  {
    icon: LiaBreadSliceSolid,
    name: 'Breakfast',
    sortIndex: 15,
  },
  {
    icon: MdOutlineLunchDining,
    name: 'Lunch',
    sortIndex: 14,
  },
  {
    icon: GiMeal,
    name: 'Dinner',
    sortIndex: 13,
  },
  {
    icon: RiDrinksLine,
    name: 'Drinks',
    sortIndex: 12,
  },
  {
    icon: LuShoppingCart,
    name: 'Housing',
    sortIndex: 11,
  },
  {
    icon: LuCakeSlice,
    name: 'Desert',
    sortIndex: 10,
  },
  {
    icon: HiOutlineShoppingBag,
    name: 'Shopping',
    sortIndex: 9,
  },
  {
    icon: GrGroup,
    name: 'Socialize',
    sortIndex: 8,
  },
  {
    icon: IoHomeOutline,
    name: 'Rent',
    sortIndex: 7,
  },
  {
    icon: RiMoneyDollarCircleLine,
    name: 'Bill',
    sortIndex: 6,
  },
  {
    icon: RiBusFill,
    name: 'Traffic',
    sortIndex: 5,
  },
  {
    icon: MdOutlineMedicalServices,
    name: 'Medical',
    sortIndex: 4,
  },
  {
    icon: IoMdGift,
    name: 'Gift',
    sortIndex: 3,
  },
  {
    icon: RiFunctionLine,
    name: 'Other',
    sortIndex: 2,
  },
]

const AddTransaction = (): JSX.Element => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isDayPickerVisible, setIsDayPickerVisible] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'expense' | 'income'>(
    'expense'
  )
  const [displayValue, setDisplayValue] = useState('0')

  function selectCategory(index: number): void {
    setSelectedCategoryIndex(index)
  }

  const toggleDayPicker = (): void => {
    setIsDayPickerVisible((prev) => !prev)
  }

  const closeDayPicker = (): void => {
    setIsDayPickerVisible(false)
  }

  function selectToday(): void {
    setSelectedDate(new Date())
    closeDayPicker()
  }

  useEffect(() => {
    document.body.style.overflow = isDayPickerVisible ? 'hidden' : 'auto'
  }, [isDayPickerVisible])

  const handlePreviousDay = (): void => {
    const previousDate = dayjs(selectedDate).subtract(1, 'day').toDate()
    setSelectedDate(previousDate)
  }
  const handleNextDay = (): void => {
    const nextDate = dayjs(selectedDate).add(1, 'day').toDate()
    setSelectedDate(nextDate)
  }
  const dateLanguageMap: Record<Locale, Lan> = {
    'en-US': enUS,
    'ja-JP': ja,
    'zh-HK': zhHK,
    'zh-TW': zhTW,
  }
  const formatDate = (date: Date, locale: Locale): string => {
    const localeMap: Record<Locale, string> = {
      'zh-TW': 'zh-tw',
      'zh-HK': 'zh-hk',
      'ja-JP': 'ja',
      'en-US': 'en',
    }
    const formatMap: Record<Locale, string> = {
      'zh-TW': 'YYYY/MM/DD dddd',
      'zh-HK': 'DD/MM/YYYY dddd',
      'ja-JP': 'dddd, YYYY年M月D日',
      'en-US': 'ddd, MMM D, YYYY',
    }
    return dayjs(date).locale(localeMap[locale]).format(formatMap[locale])
  }

  const toggleTab = (tab: 'expense' | 'income'): void => {
    if (selectedTab === tab) {
      return
    }

    setSelectedTab(tab)
    setSelectedCategoryIndex(0)
  }
  const categoryList = selectedTab === 'expense' ? categories : categories
  const selectedCategoryColor =
    selectedTab === 'expense' ? 'bg-[#FF4B4A]' : 'bg-[#1BB0F6]'

  // 解決 Safari input focus 事件造成畫面擠壓
  window.addEventListener('focusout', () => {
    window.scrollTo(0, 0)
  })

  return (
    <div className='mx-auto max-w-192 h-100dvh text-4.2 text-[#4B4B4B] flex flex-col'>
      {/* Tabs */}
      <div className='mt-2 pb-4 flex flex-center border-b-2 border-[#E5E5E5]'>
        <div className='flex border-2 border-[#E5E5E5] rounded-4 overflow-hidden'>
          {['expense', 'income'].map((tab) => (
            <button
              key={tab}
              onClick={() => toggleTab(tab as 'expense' | 'income')}
              className={`py-2 px-5 text-bold-lg transition-colors duration-100 ${
                selectedTab === tab
                  ? (tab === 'expense' ? 'bg-[#FF4B4A]' : 'bg-[#1BB0F6]') +
                    ' text-white'
                  : ''
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className='flex-1 overflow-y-auto'>
        <div className='p-5 grid grid-cols-4 gap-2.5'>
          {categoryList.map((category, index) => (
            <div
              key={category.name}
              className={`
                p-2
                flex flex-center flex-col
                text-3.5 rounded-4 aspect-ratio-1/1
                transition-colors duration-100
                ${
                  index === selectedCategoryIndex
                    ? `text-(white bold-md) ${selectedCategoryColor}`
                    : ''
                }
              `}
              onClick={() => selectCategory(index)}
            >
              <category.icon className='min-w-10 min-h-10' />
              <span>{category.name}</span>
            </div>
          ))}
          <div className='flex flex-center flex-col'>
            <IoAddCircleOutline className='min-w-10 min-h-10' />
            <span>Add</span>
          </div>
        </div>
      </div>

      <div className='p-5 flex flex-center flex-col bg-[#F6F4EF] rounded-t-4'>
        <div className='w-full flex justify-between items-center gap-5 text-(5 bold-lg)'>
          {/* Money */}
          <div className='w-30% overflow-hidden'>{displayValue}</div>
          {/* Context */}
          <input
            type='text'
            className='flex-1 text-center bg-transparent focus:outline-none'
            placeholder={'Tap here to write.'}
          />
        </div>

        {/* Date */}
        <div className='my-4 flex flex-center gap-5'>
          <FaCaretLeft onClick={handlePreviousDay} />
          <span
            className='min-w-50 text-(center bold-lg)'
            onClick={toggleDayPicker}
          >
            {formatDate(selectedDate, getLocale())}
          </span>
          <FaCaretRight onClick={handleNextDay} />
        </div>

        {/* Calculator */}
        <Calculator className='w-full' onDisplayValueChange={setDisplayValue} />
      </div>

      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black transition-opacity duration-300 
          ${isDayPickerVisible ? 'opacity-50' : 'opacity-0'} 
          ${isDayPickerVisible ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
        onClick={closeDayPicker}
      ></div>

      {/* DayPicker */}
      <div
        className={`
          py-5
          fixed bottom-0 left-0
          w-full
          bg-white shadow-lg
          transition-transform duration-300
          ${isDayPickerVisible ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <DayPicker
          mode='single'
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date || new Date())
          }}
          locale={dateLanguageMap[getLocale()]}
          classNames={{
            root: 'p-5 relative bottom-0',
            nav: 'relative flex justify-between item-center',
            month_caption: 'my-3 flex flex-center text-(6 bold-md)',
            month_grid: 'w-full min-h-30dvh gap-2',
            weeks: 'text-(center #AAAAAA bold-md)',
            today: 'bg-[#E5E5E5] text-[#4B4B4B] rounded-4',
            selected: 'bg-[#FEC700] text-[#4B4B4B] rounded-4',
          }}
        />
        <div className='px-10 py-5 flex flex-center gap-5 text-(5 bold-md)'>
          <div
            className='px-5 py-3 bg-[#E5E5E5] text-bold-lg rounded-4'
            onClick={selectToday}
          >
            Today
          </div>
          <div
            className='px-5 py-3 flex-1 text-(center bold-lg) bg-[#FEC700] rounded-4'
            onClick={closeDayPicker}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTransaction
