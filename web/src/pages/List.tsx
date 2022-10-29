import AvatarDefault from '@/components/AvatarDefault'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { getUsers } from '@/libs/usersLib/usersApi'
import { ThreeDots } from 'react-loader-spinner'
import { NavLink } from 'react-router-dom'
import { useAsync } from 'react-use'

export function List() {
  const users = useAsync(async () => {
    const usersData = await getUsers()

    return usersData
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <h1 className="text-xl sm:text-2xl text-white font-bold">
          Participantes
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {users.value?.map((user) => (
              <div
                className="
                  relative bg-red-500 rounded-2xl overflow-hidden
                  flex flex-col items-center
                  bg-card-bg bg-center bg-no-repeat bg-cover
                  shadow-xl border-b-8 border-red-300
              "
              >
                <header
                  className="
                    bg-gradient-to-b from-red-500 to-transparent
                    px-3 py-2 flex items-center justify-between
                    text-white w-full text-lg
                     font-semibold
                "
                >
                  <h1 className="text-ellipsis  overflow-hidden">
                    {user.username}
                  </h1>
                </header>

                <div
                  className={`
                    w-32 h-32 mt-8 mb-8
                    rounded-full flex items-center justify-center overflow-hidden
                    ${user.avatarUrl ? 'border-4 border-white' : ''}
                  `}
                >
                  <AvatarDefault
                    avatarUrl={user.avatarUrl}
                    alt={user.username}
                    value={user.username}
                    size={128}
                  />
                </div>

                <NavLink
                  to={`/palpites/${user.username}`}
                  title={`Ver palpites de ${user.username}`}
                  className="
                  bg-white text-red-500 font-semibold rounded-lg px-4 py-1 mb-10
                  transition duration-200 hover:scale-110 transform
                  "
                >
                  Ver palpites
                </NavLink>

                <h3 className="bg-red-300 text-white font-bold text-sm rounded-t-lg px-2 py-1">
                  {user.guessesCount} palpites
                </h3>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
