import { AuthData } from '@/@types/response'
import { BetsContainer } from '@/components/BetsContainer'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Guesses() {
  const [auth] = useLocalStorage('@pecopa-2022:auth', {} as AuthData)

  if (!auth?.user?.id) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <section className="text-white w-full">
          <span className="text-base text-white">Olá, {auth.user.name}!</span>
          <h1 className="text-2xl font-bold mt-4">Qual é o seu palpite?</h1>
        </section>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 my-8 px-5 flex-1">
        <BetsContainer />
      </main>

      <Footer />
    </div>
  )
}
