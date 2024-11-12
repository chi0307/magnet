import '@/i18n'
import '@/styles/global.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { redirect } from 'react-router-dom'

import ErrorPage from '@/error-page'
import { User } from '@/models/User'
import AddTransaction from '@/pages/AddTransaction'
import Book from '@/pages/Book'
import CreateBook from '@/pages/CreateBook'
import Login from '@/pages/Login'
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
    return redirect('/book')
  }

  return new Response(null, { status: 200 })
}

async function authLoader(): Promise<Response> {
  const userExists = await checkUser()

  if (!userExists) {
    return redirect('/')
  }

  return new Response(null, { status: 200 })
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: '/book',
    element: <Book />,
    loader: authLoader,
  },
  {
    path: '/book/add',
    element: <AddTransaction />,
    loader: authLoader,
  },
  {
    path: '/book/create',
    element: <CreateBook />,
    loader: authLoader,
  },
], {
  basename: '/magnet'
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
