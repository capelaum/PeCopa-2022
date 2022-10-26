import { Footer } from '@/components/Footer'
import { GamesContainer } from '@/components/GamesContainer'
import { Header } from '@/components/Header'
import { getGames, getGamesDates } from '@/libs/gamesLib/gamesApi'
import { Game } from '@/libs/gamesLib/gameTypes'
import { getUser } from '@/libs/usersLib/usersApi'
import { User } from '@/libs/usersLib/userTypes'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { TbCopy } from 'react-icons/tb'
import { ThreeDots } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'

export function Bets() {
  const [user, setUser] = useState<User | null>(null)
  const [games, setGames] = useState([] as Game[])
  const [gamesDates, setGamesDates] = useState([] as Date[])

  const { username } = useParams()
  const [_, copyToClipboard] = useCopyToClipboard()

  const link = `${import.meta.env.VITE_APP_URL}/palpites/${username}`

  const { error: fetchUserError, isLoading: fetchUserIsLoading } = useQuery(
    ['user'],
    () => getUser(username ?? ''),
    {
      onSuccess: (user) => {
        setUser(user)
      },
    }
  )

  const { error: fetchGamesError, isLoading: fetchGamesIsLoading } = useQuery(
    ['games'],
    () => getGames(username ?? ''),
    {
      onSuccess: (games) => {
        const gamesWithGuesses = games.filter((game) => game.guesses.length > 0)
        setGames(gamesWithGuesses)
        setGamesDates(getGamesDates(gamesWithGuesses))
      },
    }
  )

  const isFetching = fetchUserIsLoading || fetchGamesIsLoading

  const fetchError = !!fetchUserError || !!fetchGamesError

  const isValidUser = !fetchUserIsLoading && !fetchUserError && user

  const userHasGuesses = games.length > 0

  const userHasNoGuesses = !userHasGuesses && isValidUser && !isFetching

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Header>
        <section className="text-white w-full flex gap-4 items-center">
          {isValidUser && (
            <div className="flex flex-col gap-2 items-start">
              <span className="font-bold">Compartilhe os palpites!</span>
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
          {isValidUser ? `Palpites de ${user.username}` : ''}
        </h2>

        {isFetching && (
          <ThreeDots
            height="50"
            width="50"
            color="#AF053F"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}

        {fetchError && (
          <span className="font-bold text-lg text-red-500">
            Oops! Algo deu errado, usuário não encontrado 🥲
            <a href="/lista" className="button button-primary mt-8">
              Voltar para lista de jogadores.
            </a>
          </span>
        )}

        {userHasNoGuesses && (
          <span>Parece que esse jogador ainda não fez palpites... 🥲</span>
        )}

        {isValidUser && userHasGuesses && (
          <GamesContainer
            games={games}
            gamesDates={gamesDates}
            isAllBetsDisabled
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
