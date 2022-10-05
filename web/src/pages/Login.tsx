import { MdArrowBack } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

export function Login() {
  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center overflow-hidden">
      <header className="w-full flex justify-center px-5 py-5 border-b-2 border-red-300">
        <div className="max-w-[150px]">
          <img src="/assets/logo/logo-bg-white.svg" alt="NaTrave Logo" />
        </div>
      </header>

      <main className="max-w-xl w-full p-5">
        <header className="mt-8 flex gap-4">
          <NavLink to="/" title="Voltar para Home">
            <MdArrowBack size={32} color="#AF053F" />
          </NavLink>
          <h1 className="text-red-700 font-bold text-xl">Entre na sua conta</h1>
        </header>

        <form action="" className="flex flex-col gap-5 my-8">
          <div className="input-container">
            <label className="label" htmlFor="email">
              Seu e-mail
            </label>

            <input
              className="input"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="input-container">
            <label className="label" htmlFor="email">
              Sua senha
            </label>

            <input
              className="input"
              name="password"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" className="button button-primary mt-5">
            Fazer login
          </button>
        </form>
      </main>
    </div>
  )
}
