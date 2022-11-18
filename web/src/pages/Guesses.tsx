import { Footer } from '@/components/Footer'
import { GamesContainer } from '@/components/GamesContainer'
import { Header } from '@/components/Header'
import { Auth } from '@/libs/authLib/authTypes'
import { getGames, getGamesDates } from '@/libs/gamesLib/gamesApi'
import { Game } from '@/libs/gamesLib/gameTypes'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'

export function Guesses() {
  const [games, setGames] = useState([] as Game[])
  const [gamesDates, setGamesDates] = useState([] as Date[])

  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  const { error: fetchGamesError, isLoading: fetchGamesIsLoading } = useQuery(
    ['games'],
    () => getGames(auth?.user.username ?? ''),
    {
      onSuccess: (games) => {
        setGames(games)
        setGamesDates(getGamesDates(games))
      },
    }
  )

  const isGamesLoaded = !fetchGamesIsLoading

  if (!auth?.user?.id) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <section className="text-white w-full">
          <span className="text-base text-white">Olá, {auth.user.name}!</span>
          <h1 className="text-xl sm:text-2xl font-bold mt-4">
            Quais os seus palpites?
          </h1>
        </section>
      </Header>

      <main className="max-w-[712px] w-full flex flex-col items-center gap-8 my-8 px-5 flex-1">
        {fetchGamesIsLoading && (
          <ThreeDots
            height="50"
            width="50"
            color="#AF053F"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}

        {!!fetchGamesError && <span>Oops! Algo deu errado...</span>}

        {isGamesLoaded && games.length > 0 && (
          <GamesContainer games={games} gamesDates={gamesDates} />
        )}
      </main>

      <Footer />
    </div>
  )
}
