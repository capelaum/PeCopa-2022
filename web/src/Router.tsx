import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Bets } from './pages/Bets'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Register } from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/bets',
    element: <Bets />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
