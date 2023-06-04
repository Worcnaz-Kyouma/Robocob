import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home'
import Login from './components/Login'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { 
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />/*<Login />*/
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}> 
    <RouterProvider router={router} />
  </QueryClientProvider>
)
