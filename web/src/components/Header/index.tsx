import { AuthData } from '@/@types/response'
import { ReactNode } from 'react'
import { BsPeopleFill } from 'react-icons/bs'
import { MdHome, MdPerson } from 'react-icons/md'
import { TbEdit, TbLogout, TbStars } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'react-use'

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  const [auth, setAuth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as AuthData
  )

  const logout = () => {
    setAuth({} as AuthData)

    window.location.reload()

    toast.error('Você saiu da sua conta com sucesso!')
  }

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
            <div className="flex items-center gap-4">
              <NavLink
                to={`/apostas/${auth.user.username}`}
                title="Seus palpites"
              >
                <TbStars size={24} color="#F4F6FF" />
              </NavLink>

              <NavLink to="/palpites" title="Fazer palpites">
                <TbEdit size={28} color="#F4F6FF" />
              </NavLink>

              <NavLink to="/lista" title="Listagem de jogadores">
                <BsPeopleFill size={28} color="#F4F6FF" />
              </NavLink>

              <NavLink to="/perfil" title="Editar perfil">
                <MdPerson size={32} color="#F4F6FF" />
              </NavLink>

              <button title="Sair da conta." onClick={logout}>
                <TbLogout size={28} color="#F4F6FF" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink to="/lista" title="Listagem de jogadores">
                <BsPeopleFill size={24} color="#F4F6FF" />
              </NavLink>

              <NavLink to="/" title="Home">
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
