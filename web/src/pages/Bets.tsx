import { UserData } from '@/@types/response'
import { BetsContainer } from '@/components/BetsContainer'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { TbCopy } from 'react-icons/tb'
import { ThreeDots } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAsync, useCopyToClipboard } from 'react-use'

export function Bets() {
  const { username } = useParams()
  const [_, copyToClipboard] = useCopyToClipboard()

  const link = `${import.meta.env.VITE_APP_URL}/apostas/${username}`

  const user = useAsync(async () => {
    const { data }: UserData = await api.get(`/users/${username}`)

    return data
  }, [username])

  const isValidUser = !user.loading && !user.error && !!user.value

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <section className="text-white w-full flex gap-4 items-center">
          {isValidUser && (
            <div className="flex flex-col gap-2 items-start">
              <span className="font-bold">Compartilhe seus palpites!</span>
              <button
                onClick={() => {
                  copyToClipboard(link)
                  toast.info('Link copiado!')
                }}
                title="Copiar link"
                className="flex justify-start items-center bg-red-300 p-2 rounded-lg hover:bg-opacity-90 hover:cursor-pointer"
              >
                {link}
                <TbCopy size={20} className="ml-2" />
              </button>
            </div>
          )}
        </section>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 my-8 px-5 flex-1">
        <h2 className="w-full text-red-500 font-bold text-xl sm:text-2xl">
          Palpites de {isValidUser ? user.value.username : '🥲'}
        </h2>

        {user.loading && (
          <ThreeDots
            height="50"
            width="50"
            color="#AF053F"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}

        {user.error && (
          <span className="font-bold text-lg text-red-500">
            Oops! Algo deu errado, usuário não encontrado 🥲
          </span>
        )}

        {isValidUser && (
          <BetsContainer username={user.value.username} isAllBetsDisabled />
        )}
      </main>

      <Footer />
    </div>
  )
}
