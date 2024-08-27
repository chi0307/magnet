import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n'
import 'virtual:uno.css'
import ErrorPage from './error-page'
import SignInPage from './pages/SignInPage'
import LedgerPage from './pages/LedgerPage'
import CreateLedgerPage from './pages/CreateLedgerPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/ledger',
    element: <LedgerPage />,
  },
  {
    path: '/ledger/create',
    element: <CreateLedgerPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
