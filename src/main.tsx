import '@/i18n'
import '@/styles/global.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routes } from '@/router'

const router = createBrowserRouter(routes, { basename: '/magnet' })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
