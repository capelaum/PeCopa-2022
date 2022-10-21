import { AuthData } from '@/@types/response'
import { ReactNode, useEffect, useState } from 'react'
import { BsPeopleFill } from 'react-icons/bs'
import { MdHome, MdPerson } from 'react-icons/md'
import { TbEdit, TbLogout, TbStars } from 'react-icons/tb'
import { NavLink, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'react-use'

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  const [currentPath, setCurrentPath] = useState('')
  const location = useLocation()

  const [auth, setAuth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as AuthData
  )

  useEffect(() => {
    if (location.pathname === '/palpites') {
      setCurrentPath('palpites')
    }

    // check if location.pathname is /apostas/*
    if (location.pathname.includes('/apostas/')) {
      setCurrentPath('apostas')
    }

    if (location.pathname === '/perfil') {
      setCurrentPath('perfil')
    }

    if (location.pathname === '/lista') {
      setCurrentPath('lista')
    }
  }, [location])

  const logout = () => {
    setAuth({} as AuthData)

    window.location.reload()

    toast.error('Você saiu da sua conta com sucesso!')
  }

  const guessesActive = currentPath === 'palpites' ? 'header-link-active' : ''
  const betsActive = currentPath === 'apostas' ? 'header-link-active' : ''
  const profileActive = currentPath === 'perfil' ? 'header-link-active' : ''
  const listActive = currentPath === 'lista' ? 'header-link-active' : ''

  return (
    <header className="bg-red-500 w-full px-5 py-6 flex flex-col items-center">
      <div className="max-w-2xl w-full flex flex-col gap-10">
        <section className="w-full flex justify-between items-center">
          <img
            src="/assets/logo/pecopa_red.svg"
            alt="NaTrave Logo"
            className="max-w-[100px]"
          />

          {auth?.user?.id ? (
            <div className="flex items-center gap-4 py-4 h-12">
              <NavLink
                to={`/apostas/${auth.user.username}`}
                title="Seus palpites"
                className={`header-link ${betsActive}`}
              >
                <TbStars size={24} color="#F4F6FF" />
              </NavLink>

              <NavLink
                to="/palpites"
                title="Fazer palpites"
                className={`header-link ${guessesActive}`}
              >
                <TbEdit size={28} color="#F4F6FF" />
              </NavLink>

              <NavLink
                to="/lista"
                title="Listagem de jogadores"
                className={`header-link ${listActive}`}
              >
                <BsPeopleFill size={28} color="#F4F6FF" />
              </NavLink>

              <NavLink
                to="/perfil"
                title="Editar perfil"
                className={`header-link ${profileActive}`}
              >
                <MdPerson size={28} color="#F4F6FF" />
              </NavLink>

              <button
                title="Sair da conta."
                onClick={logout}
                className="header-link"
              >
                <TbLogout size={28} color="#F4F6FF" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                to="/lista"
                title="Listagem de jogadores"
                className={`header-link ${listActive}`}
              >
                <BsPeopleFill size={28} color="#F4F6FF" />
              </NavLink>

              <NavLink to="/" title="Home" className="header-link">
                <MdHome size={28} color="#F4F6FF" />
              </NavLink>
            </div>
          )}
        </section>

        {children}
      </div>
    </header>
  )
}
