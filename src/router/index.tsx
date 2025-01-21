import { LoaderFunctionArgs, redirect, RouteObject } from 'react-router'

import ErrorPage from '@/error-page'
import AddTransaction from '@/pages/AddTransaction'
import Book from '@/pages/Book'
import CreateBook from '@/pages/CreateBook'
import Login from '@/pages/Login'
import { authLoader, bookIsExistsLoader, CustomLoaderFunction } from '@/router/loaders'
import { Route } from '@/router/route'

function checkLoaders(
  loaders: CustomLoaderFunction[],
): (args: LoaderFunctionArgs) => Promise<Response> {
  return async (args: LoaderFunctionArgs): Promise<Response> => {
    for (const loader of loaders) {
      const route = await loader(args)
      if (typeof route === 'string') {
        return redirect(route)
      } else if (route !== undefined) {
        const queryString = new URLSearchParams(route.query).toString()
        return redirect(`${route.route}?${queryString}`)
      }
    }
    return new Response(null, { status: 200 })
  }
}

export const routes: RouteObject[] = [
  {
    path: Route.Home,
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: checkLoaders([authLoader]),
  },
  {
    path: Route.Book,
    element: <Book />,
    loader: checkLoaders([authLoader, bookIsExistsLoader]),
  },
  {
    path: Route.BookAdd,
    element: <AddTransaction />,
    // TODO: 需要看一下要怎麼修正其他頁面，會因為跳轉沒有傳遞到 book id 的問題
    loader: checkLoaders([authLoader, bookIsExistsLoader]),
  },
  {
    path: Route.BookCreate,
    element: <CreateBook />,
    loader: checkLoaders([authLoader, bookIsExistsLoader]),
  },
]
