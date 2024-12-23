import { redirect, LoaderFunctionArgs, RouteObject } from 'react-router'

import ErrorPage from '@/error-page'
import AddTransaction from '@/pages/AddTransaction'
import Book from '@/pages/Book'
import CreateBook from '@/pages/CreateBook'
import Login from '@/pages/Login'
import { Route } from '@/router/route'
import { isTargetRoute } from '@/router/utils'
import { checkUser } from '@/services/User'

async function authLoader({ request }: LoaderFunctionArgs): Promise<Response> {
  const userExists = await checkUser()
  const isHomeRoute = isTargetRoute(Route.Home, new URL(request.url))

  if (isHomeRoute && userExists) {
    return redirect(Route.Book)
  } else if (!isHomeRoute && !userExists) {
    return redirect(Route.Home)
  }

  return new Response(null, { status: 200 })
}

export const routes: RouteObject[] = [
  {
    path: Route.Home,
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: authLoader,
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
