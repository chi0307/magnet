import { FaShoppingCart } from 'react-icons/fa'
interface Transaction {
  date: string
  items: { description: string; amount: string }[]
  total: string
}

const transactions: Transaction[] = [
  {
    date: '2024-08-01',
    items: [
      { description: 'Groceries', amount: '$-50' },
      { description: 'Coffee', amount: '$-5' },
    ],
    total: '$-55',
  },
  {
    date: '2024-08-02',
    items: [
      { description: 'Book', amount: '$-15' },
      { description: 'Dinner', amount: '$-30' },
    ],
    total: '$-45',
  },
  {
    date: '2024-08-02',
    items: [
      { description: 'Book', amount: '$-15' },
      { description: 'Dinner', amount: '$-30' },
    ],
    total: '$-45',
  },
  {
    date: '2024-08-02',
    items: [
      { description: 'Book', amount: '$-15' },
      { description: 'Dinner', amount: '$-30' },
    ],
    total: '$-45',
  },
]

const LedgerPage = (): JSX.Element => {
  return (
    <div className='mx-auto px-4 pt-4 max-w-192 text-4.2'>
      <div className='p-4 flex justify-between items-center text-bold-lg rounded-4 border border-gray-300'>
        <div className='text-left'>
          <p className='text-gray-600 text-sm'>Expense</p>
          <p className='text-red-500 text-xl'>$123,456</p>
        </div>
        <div className='text-right'>
          <p className='text-gray-600 text-sm'>Income</p>
          <p className='text-green-500 text-xl'>$0</p>
        </div>
      </div>
      <div className='mt-8 w-full h-30 bg-white rounded-4 border border-gray-300 flex flex-center'>
        <div className='text-center text-gray-600 text-sm'>
          我是圓餅圖，要裝 Chart.js
        </div>
      </div>
      <div className='mt-8'>
        {transactions.map((transaction) => (
          <div key={transaction.date} className='mb-6 last:(mb-0 pb-4)'>
            <div className='p-4 bg-gray-100 text-bold-md border border-gray-300 rounded-4'>
              <div className='px-3 pb-3 flex justify-between items-center text-(5 bold-lg) border-b border-gray-300'>
                <span className='text-gray-800'>{transaction.date}</span>
                <span className='text-emerald-600'>{transaction.total}</span>
              </div>
              {transaction.items.map((item, index) => (
                <div
                  key={index}
                  className='px-3 py-2 flex justify-between items-center border-b border-gray-300 last:(pb-0 border-none)'
                >
                  <FaShoppingCart className='text-gray-500 min-w-6 min-h-6' />
                  <span className='ml-3 mr-2 w-full text-ellipsis line-clamp-1 text-gray-700'>
                    {item.description}
                  </span>
                  <span className='text-gray-900'>{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LedgerPage
