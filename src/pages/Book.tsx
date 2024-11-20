import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoAdd } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import DoughnutPieChart from '@/components/DoughnutPieChart'
import { iconList } from '@/constant/icons'
import { Route } from '@/router/route'
import { getAllTransactions } from '@/services/Transaction'
import { type Transaction } from '@/types/utils'
import { getCurrency } from '@/utils/CurrencyManager'
import { getLocale } from '@/utils/locale'
import { calculateTotal } from '@/utils/transactionHelpers'

function groupTransactionsByDate(
  rawData: Awaited<ReturnType<typeof getAllTransactions>>
): Transaction[] {
  const grouped = new Map<string, Transaction>()

  for (const { transactionDate, name, amount, icon, categoryName } of rawData) {
    const date = format(transactionDate, 'yyyy-MM-dd')
    const itemsByDate = grouped.get(date) ?? {
      date,
      items: [],
      total: 0,
    }

    itemsByDate.items.push({
      description: name ?? categoryName,
      amount,
      icon: iconList[icon],
    })
    itemsByDate.total += amount
    grouped.set(date, itemsByDate)
  }

  return [...grouped.values()]
}

const Book = (): JSX.Element => {
  const { t } = useTranslation()
  const currency = getCurrency()
  const locale = getLocale()

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [totalIncome, setTotalIncome] = useState<number>(0)

  // 獲取 transactions 的副作用
  useEffect(() => {
    async function fetchTransactions(): Promise<void> {
      try {
        const transactions = await getAllTransactions()
        const allTransactions = groupTransactionsByDate(transactions)

        setTotalExpense(Math.abs(calculateTotal(transactions, 'expense')))
        setTotalIncome(calculateTotal(transactions, 'income'))
        setTransactions(allTransactions)
      } catch {
        // TODO: 會回報錯誤 Error: not found default book，需要檢查登入狀況跟重新建立 book 資料
      }
    }
    void fetchTransactions()
  }, [])

  // 排序 transactions 依照日期
  if (transactions.length > 0) {
    transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  // 格式化貨幣
  function formattedCurrency(amount: number): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount)
  }

  // 格式化日期 (你可以根據需要修改)
  function formattedDate(date: string): string {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
      new Date(date)
    )
  }

  return (
    <div className='mx-auto px-4 pt-4 max-w-107.5 text-4.2'>
      <div
        className='
          p-4
          flex justify-between items-center
          text-bold-lg rounded-4
          border border-[#E5E5E5]
        '
      >
        <div className='text-left'>
          <p className='text-[#4B4B4B] text-sm'>{t('book.expense')}</p>
          <p className='text-[#FF4B4A] text-xl'>
            {formattedCurrency(totalExpense)}
          </p>
        </div>
        <div className='text-right'>
          <p className='text-[#4B4B4B] text-sm'>{t('book.income')}</p>
          <p className='text-[#1BB0F6] text-xl'>
            {formattedCurrency(totalIncome)}
          </p>
        </div>
      </div>
      <div className='mx-auto my-8 w-80'>
        <DoughnutPieChart
          totalExpense={totalExpense}
          totalIncome={totalIncome}
        />
      </div>
      <div>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.date} className='mb-6 last:(mb-0 pb-4)'>
              <div className='p-4 bg-[#F6F4EF] text-bold-md rounded-4'>
                <div
                  className='
                    px-3 pb-3
                    flex justify-between items-center
                    border-b border-[#E5E5E5]
                  '
                >
                  <span className='text-[#4B4B4B]'>
                    {formattedDate(transaction.date)}
                  </span>
                  <span
                    className={`
                      text-bold-lg 
                      ${
                        transaction.total > 0
                          ? 'text-[#1BB0F6]'
                          : 'text-[#FF4B4A]'
                      }
                    `}
                  >
                    {formattedCurrency(transaction.total)}
                  </span>
                </div>
                {transaction.items.map((item, index) => (
                  <div
                    key={index}
                    className='
                      px-3 py-2
                      flex justify-between items-center
                      border-b border-[#E5E5E5]
                      last:(pb-0 border-none)
                    '
                  >
                    <item.icon className='min-w-6 min-h-6 text-[#4B4B4B]' />
                    <span
                      className='
                        ml-3 mr-2
                        flex-1
                        text-[#4B4B4B] text-ellipsis line-clamp-1
                      '
                    >
                      {item.description}
                    </span>
                    <span className='text-[#4B4B4B]'>
                      {formattedCurrency(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className='pt-20 text-(center sm)'>{t('book.no_transactions')}</p>
        )}
      </div>
      <Link
        to={Route.BookAdd}
        className='
          fixed bottom-5% left-1/2
          flex flex-center
          w-15 h-15
          transform -translate-x-1/2
          bg-[#FEC700] rounded-full
          border-2 border-white
        '
      >
        <IoAdd className='w-10 h-10 text-white' />
      </Link>
    </div>
  )
}

export default Book
