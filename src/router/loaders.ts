import { LoaderFunctionArgs } from 'react-router'

import { Route } from '@/router/route'
import { baseUrl, isTargetRoute } from '@/router/utils'
import { bookIsExists, checkDefaultBook } from '@/services/Book'
import { checkUser } from '@/services/User'
import { isUuid } from '@/utils/checkTyping'
import { localStorageManager } from '@/utils/StorageManager'

type LoaderReturnType =
  | Route
  | string
  | void
  | { route: string | Route; query: Record<string, string> }
export type CustomLoaderFunction = (
  args: LoaderFunctionArgs,
) => Promise<LoaderReturnType> | LoaderReturnType

export async function authLoader({ request }: LoaderFunctionArgs): Promise<LoaderReturnType> {
  const userExists = await checkUser()
  const isHomeRoute = isTargetRoute(Route.Home, new URL(request.url))

  if (isHomeRoute && userExists) {
    return Route.Book
  } else if (!isHomeRoute && !userExists) {
    return Route.Home
  }
}

export async function bookIsExistsLoader({
  request,
}: LoaderFunctionArgs): Promise<LoaderReturnType> {
  const url = new URL(request.url)
  const route = url.pathname.replace(baseUrl, '')

  const userId = localStorageManager.get('userId')
  if (userId === null) {
    throw new Error('user id is null')
  }
  let bookId = url.searchParams.get('bookId')
  if (bookId !== null && isUuid(bookId)) {
    const isExists = await bookIsExists(bookId)
    if (isExists) {
      return
    }
  }
  // TODO: 這邊特別取出 default book 不太正統，可能要想一下流程該怎麼設計比較好
  bookId = await checkDefaultBook(userId)
  return { route, query: { bookId } }
}
