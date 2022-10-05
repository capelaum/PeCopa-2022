import { ReactNode } from 'react'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { TbUserCircle } from 'react-icons/tb'
import { NavLink } from 'react-router-dom'

interface HeaderProps {
  children: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="bg-red-500 w-full px-5 py-6 flex flex-col items-center">
      <div className="max-w-2xl w-full flex flex-col gap-10">
        <section className="w-full flex justify-between items-center">
          <img
            src="/assets/logo/logo-bg-red.svg"
            alt="NaTrave Logo"
            className="max-w-[100px]"
          />

          <div className="flex items-center gap-4">
            <NavLink to="/bets" title="Seus palpites">
              <BsBookmarkStarFill size={24} color="#F4F6FF" />
            </NavLink>

            <NavLink to="/profile" title="Editar perfil">
              <TbUserCircle size={32} color="#F4F6FF" />
            </NavLink>
          </div>
        </section>

        {children}
      </div>
    </header>
  )
}
