import { RouteObject } from 'react-router-dom'
import { redirect } from 'react-router-dom'

import ErrorPage from '@/error-page'
import { User } from '@/models/User'
import AddTransaction from '@/pages/AddTransaction'
import Book from '@/pages/Book'
import CreateBook from '@/pages/CreateBook'
import Login from '@/pages/Login'
import { Route } from '@/router/route'
import { isUuid } from '@/utils/checkTyping'
import { localStorageManager } from '@/utils/StorageManager'

async function checkUser(): Promise<boolean> {
  const userModel = new User()
  const savedUserId = localStorageManager.get('userId')

  if (isUuid(savedUserId)) {
    const existingUser = await userModel.findById(savedUserId)
    return !!existingUser
  }

  return false
}

async function rootLoader(): Promise<Response> {
  const userExists = await checkUser()

  if (userExists) {
    return redirect(Route.Book)
  }

  return new Response(null, { status: 200 })
}

async function authLoader(): Promise<Response> {
  const userExists = await checkUser()

  if (!userExists) {
    return redirect(Route.Home)
  }

  return new Response(null, { status: 200 })
}

export const routes: RouteObject[] = [
  {
    path: Route.Home,
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: Route.Book,
    element: <Book />,
    loader: authLoader,
  },
  {
    path: Route.BookAdd,
    element: <AddTransaction />,
    loader: authLoader,
  },
  {
    path: Route.BookCreate,
    element: <CreateBook />,
    loader: authLoader,
  },
]