import { Auth } from '@/libs/authLib/authTypes'
import { Navigate, NavLink } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Home() {
  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  if (auth?.user?.id) {
    return <Navigate to="/palpites" replace />
  }

  return (
    <div className="min-h-screen px-6 py-8 bg-red-700 text-white flex flex-col items-center justify-center">
      <header className="max-w-[150px] mb-20 md:mb-32">
        <img src="/assets/logo/pecopa_whine.svg" alt="NaTrave Logo" />
      </header>

      <main className="max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
        <div className="max-w-md">
          <img
            src="/assets/imgs/hero_2.png"
            alt="Imagem de dois doidões com camisa do Brasil olhando feio para você."
          />
        </div>

        <section className="flex flex-col gap-6 max-w-md">
          <h1 className="text-2xl md:text-3xl text-center md:text-left font-bold mb-4">
            Dê o seu palpite na Copa do Mundo do Catar 2022!
          </h1>

          <NavLink
            to="/login"
            title="Fazer login"
            className="
              button
              flex items-center justify-center
              text-white
              border border-white
              hover:bg-red-500 hover:border-red-500
            "
          >
            Fazer login
          </NavLink>

          <NavLink
            to="/cadastro"
            title="Criar minha conta"
            className="
              button
              flex items-center justify-center
            bg-white text-red-700
              hover:bg-red-500 hover:text-white
          "
          >
            Criar minha conta
          </NavLink>

          <NavLink
            to="/lista"
            title="Participantes"
            className="
            button
            flex items-center justify-center
          bg-white text-red-700
            hover:bg-red-500 hover:text-white
            "
          >
            Participantes
          </NavLink>
        </section>
      </main>
    </div>
  )
}
