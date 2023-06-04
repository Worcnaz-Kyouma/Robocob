import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home'
import Login from './components/Login'
import Root from './components/root'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

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
        path: "/login",
        element: <Login />
      }
    ]
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}> 
    <ReactQueryDevtools />
    <RouterProvider router={router} />
  </QueryClientProvider>
)
