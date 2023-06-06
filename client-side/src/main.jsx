import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/home/Home'
import Login from './components/Login'
import Root from './components/Root'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import PaymentSlipSender from './components/PaymentSlipSender'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "home/sender",
        element: <PaymentSlipSender />
      },
      {
        path: "/login",
        element: <Login />
      },
      
    ]
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}> 
    <RouterProvider router={router} />
  </QueryClientProvider>
)
