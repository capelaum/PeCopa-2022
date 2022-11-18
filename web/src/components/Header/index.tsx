import { Auth } from '@/libs/authLib/authTypes'
import { ReactNode, useEffect, useState } from 'react'
import { BsPeopleFill } from 'react-icons/bs'
import { MdHome } from 'react-icons/md'
import { TbEdit, TbLogout, TbStars } from 'react-icons/tb'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'react-use'
import AvatarDefault from '../AvatarDefault'

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  const [currentPath, setCurrentPath] = useState('')
  const location = useLocation()

  const { username } = useParams()

  const [auth, setAuth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  useEffect(() => {
    if (location.pathname === '/palpites') {
      setCurrentPath('palpites')
    }

    if (location.pathname.includes('/palpites/')) {
      setCurrentPath('palpites-user')
    }

    if (location.pathname === '/perfil') {
      setCurrentPath('perfil')
    }

    if (location.pathname === '/lista') {
      setCurrentPath('lista')
    }
  }, [location])

  const logout = () => {
    setAuth({} as Auth)

    window.location.reload()

    toast.error('Você saiu da sua conta com sucesso!')
  }

  const guessesActive = currentPath === 'palpites' ? 'header-link-active' : ''
  const betsActive = currentPath === 'palpites-user' ? 'header-link-active' : ''
  const profileActive = currentPath === 'perfil' ? 'header-link-active' : ''
  const listActive = currentPath === 'lista' ? 'header-link-active' : ''

  return (
    <header className="bg-red-500 w-full px-5 pb-6 flex flex-col items-center">
      <div className="max-w-2xl w-full flex flex-col gap-10">
        <section className="w-full flex flex-col-reverse gap-8 items-center sm:flex-row justify-between sm:items-end">
          <img
            src="/assets/logo/pecopa_red.svg"
            alt="NaTrave Logo"
            className="max-w-[100px] pb-4"
          />

          <div className="flex items-center gap-2">
            {(auth?.user || username) && (
              <NavLink
                to={`/palpites/${auth?.user ? auth.user.username : username}`}
                title="Seus palpites"
                className={`header-link ${betsActive}`}
              >
                <TbStars size={24} />
              </NavLink>
            )}

            {auth?.user?.id && (
              <>
                <NavLink
                  to="/palpites"
                  title="Fazer palpites"
                  className={`header-link ${guessesActive}`}
                >
                  <TbEdit size={28} />
                </NavLink>

                <NavLink
                  to="/lista"
                  title="Listagem de participantes"
                  className={`header-link ${listActive}`}
                >
                  <BsPeopleFill size={28} />
                </NavLink>

                <NavLink
                  to="/perfil"
                  title="Editar perfil"
                  className={`header-link ${profileActive}`}
                >
                  <AvatarDefault
                    avatarUrl={auth.user.avatarUrl}
                    alt={auth.user.username}
                    value={auth.user.username}
                    border={true}
                    size={30}
                    isHeader
                  />
                </NavLink>

                <button
                  title="Sair da conta."
                  onClick={logout}
                  className="header-link"
                >
                  <TbLogout size={28} />
                </button>
              </>
            )}

            {!auth?.user?.id && (
              <>
                <NavLink
                  to="/lista"
                  title="Listagem de participantes"
                  className={`header-link ${listActive}`}
                >
                  <BsPeopleFill size={28} />
                </NavLink>

                <NavLink to="/" title="Home" className="header-link">
                  <MdHome size={28} />
                </NavLink>
              </>
            )}
          </div>
        </section>

        {children}
      </div>
    </header>
  )
}
