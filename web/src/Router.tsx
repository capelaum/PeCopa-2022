import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Bets } from './pages/Bets'
import { AlreadyVerifiedMail } from './pages/email/AlreadyVerifiedMail'
import { VerifiedMail } from './pages/email/VerifiedMail'
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
    path: '/palpites/:username',
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
  {
    path: '/email/verificado',
    element: <VerifiedMail />,
  },
  {
    path: '/email/ja-verificado',
    element: <AlreadyVerifiedMail />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
