import { UsersData } from '@/@types/response'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { api } from '@/services/api'
import { BsFillEyeFill } from 'react-icons/bs'
import { ThreeDots } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'
import { useAsync } from 'react-use'

export function List() {
  const users = useAsync(async () => {
    const { data }: UsersData = await api.get(`/users`)

    return data
  }, [])

  console.log('🚀 ~ users', users)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <h1 className="text-xl sm:text-2xl text-white font-bold">
          Listagem de jogadores
        </h1>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col gap-8 my-8 px-5 flex-1 overflow-auto">
        {users.loading && (
          <ThreeDots
            height="50"
            width="50"
            color="#AF053F"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}

        {users.error && <span>Oops! Algo deu errado...</span>}

        {!users.error && !users.loading && (
          <div>
            <table className="w-full border-collapse min-w-[400px]">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Nº Palpites</th>
                  <th>Ver Palpites</th>
                </tr>
              </thead>
              <tbody>
                {users.value?.map((user) => (
                  <tr key={user.id}>
                    <td className="font-bold">{user.username}</td>
                    <td className="font-bold">{user.totalGuesses}</td>
                    <td>
                      <NavLink
                        to={`/apostas/${user.username}`}
                        title={`Ver palpites de ${user.username}`}
                        className="inline-flex items-center justify-center hover:bg-gray-100 p-1 rounded-md"
                      >
                        <BsFillEyeFill size={24} color="BB2E57" />
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
