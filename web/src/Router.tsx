import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Bets } from './pages/Bets'
import { Guesses } from './pages/Guesses'
import { Home } from './pages/Home'
import { List } from './pages/List'
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
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/palpites',
    element: <Guesses />,
  },
  {
    path: '/apostas/:username',
    element: <Bets />,
  },
  {
    path: '/perfil',
    element: <Profile />,
  },
  {
    path: '/lista',
    element: <List />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
