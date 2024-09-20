import '@/i18n'
import '@/styles/global.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { redirect } from 'react-router-dom'

import ErrorPage from '@/error-page'
import AddTransaction from '@/pages/AddTransaction'
import CreateLedgerPage from '@/pages/CreateLedgerPage'
import LedgerPage from '@/pages/LedgerPage'
import SignInPage from '@/pages/SignInPage'
import { localStorageManager } from '@/utils/StorageManager'

export function rootLoader(): Response {
  const savedLoginMethod = localStorageManager.get('loginMethod')

  if (savedLoginMethod !== null && savedLoginMethod !== '') {
    return redirect('/ledger')
  }

  return new Response(null, {
    status: 200,
  })
}

export function authLoader(): Response {
  const savedLoginMethod = localStorageManager.get('loginMethod')

  if (savedLoginMethod === null || savedLoginMethod === '') {
    return redirect('/')
  }

  return new Response(null, {
    status: 200,
  })
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: '/ledger',
    element: <LedgerPage />,
    loader: authLoader,
  },
  {
    path: '/ledger/add',
    element: <AddTransaction />,
    loader: authLoader,
  },
  {
    path: '/ledger/create',
    element: <CreateLedgerPage />,
    loader: authLoader,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
