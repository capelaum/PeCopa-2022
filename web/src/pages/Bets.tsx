import { UserData } from '@/@types/response'
import { BetsContainer } from '@/components/BetsContainer'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { MdArrowBack } from 'react-icons/md'
import { ThreeDots } from 'react-loader-spinner'
import { NavLink, useParams } from 'react-router-dom'
import { useAsync } from 'react-use'

export function Bets() {
  const { username } = useParams()

  const user = useAsync(async () => {
    const { data }: UserData = await api.get(`/users/${username}`)

    return data
  }, [username])

  const isValidUser = !user.loading && !user.error && !!user.value

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <section className="text-white w-full flex gap-4 items-center">
          <NavLink to="/palpites" title="Fazer palpites">
            <MdArrowBack size={32} color="#F4F6FF" />
          </NavLink>

          <h1 className="text-xl sm:text-2xl font-bold">
            {isValidUser ? (
              user.value.username
            ) : (
              <ThreeDots
                height="50"
                width="50"
                color="#F4F6FF"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            )}
          </h1>
        </section>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 my-8 px-5 flex-1">
        <h2 className="w-full text-red-500 font-bold text-2xl">
          Seus palpites
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
