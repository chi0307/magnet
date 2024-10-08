import { addDays, format, subDays } from 'date-fns'
import { enUS, ja, zhHK, zhTW, type Locale as LanLocale } from 'date-fns/locale'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { FaCaretLeft } from 'react-icons/fa6'
import { FaCaretRight } from 'react-icons/fa6'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import Calculator from '@/components/Calculator'
import {
  type Category,
  expenseCategory,
  incomeCategory,
} from '@/constant/transactionCategories'
import { Ledger } from '@/models/Ledger'
import { Purchase } from '@/models/Purchase'
import { type Locale, getLocale } from '@/utils/locale'
import { localStorageManager } from '@/utils/StorageManager'
import { generateUuid } from '@/utils/utils'

interface CategoryItemProps {
  category: Category
  isSelected: boolean
  onSelect: () => void
  color: string
}

type SelectedTab = 'expense' | 'income'

const formatDate = (date: Date, locale: Locale): string => {
  const localeMap: Record<Locale, LanLocale> = {
    'zh-TW': zhTW,
    'zh-HK': zhHK,
    'ja-JP': ja,
    'en-US': enUS,
  }
  const formatMap: Record<Locale, string> = {
    'zh-TW': 'yyyy/MM/dd EEEE',
    'zh-HK': 'dd/MM/yyyy EEEE',
    'ja-JP': 'EEEE, yyyy年M月d日',
    'en-US': 'EEE, MMM d, yyyy',
  }

  return format(date, formatMap[locale], { locale: localeMap[locale] })
}

// Category component
const CategoryItem = ({
  category,
  isSelected,
  onSelect,
  color,
}: CategoryItemProps): JSX.Element => (
  <div
    className={`
      p-2
      flex flex-center flex-col
      text-3.5 rounded-4 aspect-ratio-1/1
      transition-colors duration-100
      ${isSelected ? `text-(white bold-md) ${color}` : ''}
    `}
    onClick={onSelect}
  >
    <category.icon className='min-w-10 min-h-10' />
    <span>{category.name}</span>
  </div>
)

// Main Component
const AddTransaction = (): JSX.Element => {
  const navigate = useNavigate()

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isDayPickerVisible, setIsDayPickerVisible] = useState(false)
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('expense')
  const [calculatorValue, setCalculatorValue] = useState('0')
  const [purchaseContext, setPurchaseContext] = useState('')

  const ledgerModel = new Ledger()
  const purchaseModel = new Purchase()

  // Toggles visibility of DayPicker
  const toggleDayPicker = (): void => setIsDayPickerVisible((prev) => !prev)
  const closeDayPicker = (): void => setIsDayPickerVisible(false)

  // Sets selected date to today
  const selectToday = (): void => {
    setSelectedDate(new Date())
    closeDayPicker()
  }

  // Sets tab state and resets category index
  const toggleTab = (tab: SelectedTab): void => {
    if (selectedTab !== tab) {
      setSelectedTab(tab)
      setSelectedCategoryIndex(0)
    }
  }

  // Updates document body style based on DayPicker visibility
  useEffect(() => {
    document.body.style.overflow = isDayPickerVisible ? 'hidden' : 'auto'
  }, [isDayPickerVisible])

  // Maps locale to date-fns locale for DayPicker
  const dateLanguageMap: Record<Locale, LanLocale> = {
    'en-US': enUS,
    'ja-JP': ja,
    'zh-HK': zhHK,
    'zh-TW': zhTW,
  }

  const selectedCategoryBgColor =
    selectedTab === 'expense' ? 'bg-[#FF4B4A]' : 'bg-[#1BB0F6]'

  const categoryList =
    selectedTab === 'expense' ? expenseCategory : incomeCategory

  const tabs: SelectedTab[] = ['expense', 'income']

  const handleTransaction = async (): Promise<void> => {
    const savedUserId = localStorageManager.get('userId')

    if (savedUserId === null) {
      return
    }

    const existingLedger = await ledgerModel.findByUserId(savedUserId)
    const adjustedAmount =
      selectedTab === 'expense'
        ? -Math.abs(Number(calculatorValue))
        : Math.abs(Number(calculatorValue))

    if (existingLedger) {
      await purchaseModel
        .insert({
          ledgerId: existingLedger.id,
          categoryId: generateUuid(), //TODO
          name: purchaseContext,
          amount: adjustedAmount,
          purchaseDate: selectedDate,
        })
        .then(() => {
          navigate('/ledger')
        })
        .catch((error) => {
          console.error('add transaction error: ', error)
        })
    }
  }

  // Fix Safari input focus issue
  useEffect(() => {
    const handleFocusOut = (): void => window.scrollTo(0, 0)
    window.addEventListener('focusout', handleFocusOut)
    return (): void => window.removeEventListener('focusout', handleFocusOut)
  }, [])

  return (
    <div
      className='
        mx-auto
        flex flex-col
        max-w-192 h-100dvh
        text-(4.2 [#4B4B4B])
      '
    >
      {/* Tabs */}
      <div
        className='
          mt-2 pb-4
          flex flex-center
          border-b-2 border-[#E5E5E5]
        '
      >
        <div className='flex border-2 border-[#E5E5E5] rounded-4 overflow-hidden'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => toggleTab(tab)}
              className={`py-2 px-5 text-bold-lg transition-colors duration-100 ${
                selectedTab === tab
                  ? (tab === 'expense' ? 'bg-[#FF4B4A]' : 'bg-[#1BB0F6]') +
                    ' text-white'
                  : ''
              }`}
            >
              {t(`ledger.${tab}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className='flex-1 overflow-y-auto'>
        <div className='p-5 grid grid-cols-4 gap-2.5'>
          {categoryList.map((category, index) => (
            <CategoryItem
              key={category.name}
              category={category}
              isSelected={index === selectedCategoryIndex}
              onSelect={() => setSelectedCategoryIndex(index)}
              color={selectedCategoryBgColor}
            />
          ))}
          <div
            className='
              p-2
              flex flex-center flex-col
              text-3.5 rounded-4 aspect-ratio-1/1
            '
          >
            <IoAddCircleOutline className='min-w-10 min-h-10' />
            <span>{t('general.add')}</span>
          </div>
        </div>
      </div>

      <div className='p-5 flex flex-center flex-col bg-[#F6F4EF] rounded-t-4'>
        {/* Transaction Info */}
        <div className='w-full flex justify-between items-center gap-1'>
          <span
            className='
              px-2.5 py-1
              w-30% bg-[#E5E5E5] rounded-4
              text-(6 bold-lg right ellipsis)
              overflow-hidden whitespace-nowrap
            '
          >
            {calculatorValue}
          </span>
          {/* Context */}
          <input
            name='context'
            type='text'
            className='flex-1 h-full bg-transparent text-(bold-md center) focus:outline-none'
            placeholder={t('ledger.tap_to_write')}
            onChange={(e) => setPurchaseContext(e.target.value)}
          />
        </div>
        {/* Date */}
        <div className='my-4 flex flex-center gap-5'>
          <FaCaretLeft
            onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          />
          <span
            className='min-w-50 text-(center bold-lg)'
            onClick={toggleDayPicker}
          >
            {formatDate(selectedDate, getLocale())}
          </span>
          <FaCaretRight
            onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          />
        </div>

        {/* Calculator */}
        <Calculator
          className='w-full'
          onDisplayValueChange={setCalculatorValue} // Pass the callback to Calculator
          onClick={() => {
            handleTransaction().catch((error) => {
              console.error('Error during user registration:', error)
            })
          }}
        />
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

      {/* Date Picker */}
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
          locale={dateLanguageMap[getLocale()]}
          defaultMonth={selectedDate}
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date || new Date())
          }}
          classNames={{
            root: 'p-5 relative bottom-0',
            nav: 'relative flex justify-between item-center',
            month_caption: 'my-3 flex flex-center text-(6 bold-md)',
            month_grid: 'w-full aspect-ratio-1/1',
            weeks: 'text-(center #AAAAAA)',
            today: 'text-(black bold-lg)',
            selected: `${selectedCategoryBgColor} text-(white [#4B4B4B] bold-lg) rounded-4`,
          }}
        />
        <div className='px-10 py-5 flex flex-center gap-5 text-(5 bold-md)'>
          <button
            onClick={selectToday}
            className='flex-1 py-3 text-center text-bold-lg bg-[#E5E5E5] rounded-4'
          >
            {t('general.today')}
          </button>
          <button
            className={`px-5 py-3 text-(center bold-lg) text-white rounded-4 ${selectedCategoryBgColor}`}
            onClick={closeDayPicker}
          >
            {t('general.save')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTransaction
