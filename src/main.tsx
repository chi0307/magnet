import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n'
import './styles/global.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import { redirect } from 'react-router-dom'
import { localStorageManager } from './utils/StorageManager'
import ErrorPage from './error-page'
import SignInPage from './pages/SignInPage'
import LedgerPage from './pages/LedgerPage'
import CreateLedgerPage from './pages/CreateLedgerPage'

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
