import { FaShoppingCart } from 'react-icons/fa'
import { IoAdd } from 'react-icons/io5'
import { getCurrency } from '../utils/CurrencyManager'
import { getLocale } from '../utils/locale'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DoughnutPieChart from '../components/DoughnutPieChart'

interface Transaction {
  date: string
  items: { description: string; amount: number }[]
  total: number
}

const transactions: Transaction[] = [
  {
    date: '2024-08-01',
    items: [
      { description: 'Groceries', amount: -50.98 },
      { description: 'Coffee', amount: -5.03 },
    ],
    total: -56.01,
  },
  {
    date: '2024-08-02',
    items: [
      { description: 'Book', amount: -15 },
      { description: 'Dinner', amount: -30 },
    ],
    total: -45,
  },
  {
    date: '2024-08-05',
    items: [
      { description: 'Book', amount: 15 },
      { description: 'Dinner', amount: 30 },
    ],
    total: 45,
  },
  {
    date: '2024-08-03',
    items: [
      { description: 'Book', amount: -15 },
      { description: 'Dinner', amount: -30 },
    ],
    total: -45,
  },
]

const LedgerPage = (): JSX.Element => {
  const { t } = useTranslation()
  const currency = getCurrency()
  const locale = getLocale()

  transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  function formattedCurrency(dollar: number): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(dollar)
  }

  return (
    <div className='mx-auto px-4 pt-4 max-w-192 text-4.2'>
      <div
        className='
          p-4
          flex justify-between items-center
          text-bold-lg rounded-4
          border border-[#E5E5E5]
        '
      >
        <div className='text-left'>
          <p className='text-[#4B4B4B] text-sm'>{t('ledger.expense')}</p>
          <p className='text-[#FF4B4A] text-xl'>{formattedCurrency(123456)}</p>
        </div>
        <div className='text-right'>
          <p className='text-[#4B4B4B] text-sm'>{t('ledger.income')}</p>
          <p className='text-[#1DB0F5] text-xl'>{formattedCurrency(654321)}</p>
        </div>
      </div>
      <div className='mx-auto my-8 w-80'>
        <DoughnutPieChart />
      </div>
      <div>
        {transactions.map((transaction) => (
          <div key={transaction.date} className='mb-6 last:(mb-0 pb-4)'>
            <div className='p-4 bg-[#F6F4EF] text-bold-md rounded-4'>
              <div
                className='
                  px-3 pb-3
                  flex justify-between items-center
                  border-b border-[#E5E5E5]
                  '
              >
                <span className='text-[#4B4B4B]'>{transaction.date}</span>
                <span
                  className={`
                    text-bold-lg 
                    ${
                      transaction.total > 0
                        ? 'text-[#1DB0F5]'
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
                  <FaShoppingCart className='min-w-6 min-h-6 text-[#4B4B4B]' />
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
        ))}
      </div>
      <Link
        to={'/ledger/add'}
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

export default LedgerPage
