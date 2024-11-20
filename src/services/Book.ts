import { Book } from '@/models/Book'
import { createDefaultCategories } from '@/services/Category'
import { type BookEntity } from '@/types/database'
import { type Currency } from '@/utils/CurrencyManager'

const bookModel = new Book()

export async function createBook({
  userId,
  bookName,
  currency,
}: {
  userId: BookEntity['userId']
  bookName: string
  currency: Currency
}): Promise<BookEntity['id']> {
  const bookId = await bookModel.insert({
    name: bookName,
    currency,
    userId,
  })

  if (bookId === null) {
    throw new Error('create book failed')
  }

  await createDefaultCategories(bookId)

  return bookId
}

export async function getDefaultBook(): Promise<Readonly<BookEntity>> {
  const book = await bookModel.findByName('default')
  if (book === null) {
    throw new Error('not found default book')
  }
  return book
}
