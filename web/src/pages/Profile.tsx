import { AuthData } from '@/@types/response'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Profile() {
  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as AuthData
  )

  if (!auth?.user?.id) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <h1 className="text-xl sm:text-2xl text-white font-bold">
          Luís Vinicius Capelletto
        </h1>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 my-8 px-5 flex-1">
        <form action="">
          <div>Editar Perfil</div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
