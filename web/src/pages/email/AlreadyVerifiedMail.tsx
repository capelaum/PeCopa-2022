import { NavLink, useSearchParams } from 'react-router-dom'

export function AlreadyVerifiedMail() {
  const [searchParams] = useSearchParams()

  const name = searchParams.get('name')
  const email = searchParams.get('email')

  return (
    <div className="min-h-screen bg-red-700 flex flex-col items-center justify-center text-white text-lg gap-12 p-12">
      <h1 className="text-xl md:text-2xl font-bold text-center max-w-lg leading-5">
        Olá {name}. Seu e-mail <span className="text-red-400">{email}</span> já
        havia sido verificado!
      </h1>

      <img
        src="/assets/utils/email_verified.svg"
        alt="Email verificado"
        className="max-w-[300px] mt-12"
      />

      <p className="text-center">Você já pode fazer o login!</p>

      <NavLink
        to="/login"
        title="Fazer login"
        className="
          button button-primary
          flex items-center justify-center
        "
      >
        Fazer login
      </NavLink>
    </div>
  )
}
