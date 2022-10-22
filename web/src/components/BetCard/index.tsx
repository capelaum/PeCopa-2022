import { Game } from '@/@types/game'
import { Guess } from '@/@types/guess'
import { AuthData, NewGuessResponse } from '@/@types/response'
import { BetScore } from '@/components/BetScore'
import { TeamCard } from '@/components/TeamCard'
import { api } from '@/services/api'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'react-use'

interface BetCardProps {
  game: Game
  isAllBetsDisabled?: boolean
  guess?: Guess
  refetchGuesses: () => Promise<void>
}

export function BetCard({
  game,
  isAllBetsDisabled,
  guess,
  refetchGuesses,
}: BetCardProps) {
  const [homeTeamScore, setHomeTeamScore] = useState<number | null>(null)
  const [awayTeamScore, setAwayTeamScore] = useState<number | null>(null)
  const [isCreatingGuess, setIsCreatingGuess] = useState(false)

  const { gameTime, homeTeam, awayTeam, group, round } = game

  const isBetDisabled =
    new Date(gameTime) < new Date() ||
    new Date(gameTime) > new Date(2022, 11, 18) ||
    homeTeam.slug === '?' ||
    awayTeam.slug === '?' ||
    isAllBetsDisabled ||
    !!guess

  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as AuthData
  )

  const handleSetHomeTeamScore = (isIncrease = true) => {
    setHomeTeamScore((score) => {
      if (score === null) return 0

      if (score === 0 && !isIncrease) return 0

      if (score === 30 && isIncrease) return 30

      return isIncrease ? score + 1 : score - 1
    })
  }

  const handleSetAwayTeamScore = (isIncrease = true) => {
    setAwayTeamScore((score) => {
      if (score === null) return 0

      if (score === 0 && !isIncrease) return 0

      if (score === 30 && isIncrease) return 30

      return isIncrease ? score + 1 : score - 1
    })
  }

  const handleCreateGuess = async () => {
    setIsCreatingGuess(true)

    if (homeTeamScore === null || awayTeamScore === null) {
      toast.error('Você precisa preencher os dois placares para apostar!')
      setIsCreatingGuess(false)
      return
    }

    try {
      const { data: newGuessData }: { data: NewGuessResponse } = await api.post(
        '/guesses',
        {
          userId: auth?.user.id,
          gameId: game.id,
          homeTeamScore,
          awayTeamScore,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      )

      if (newGuessData) {
        await refetchGuesses()
      }

      toast.success(newGuessData.message)

      setIsCreatingGuess(false)
    } catch (error) {
      toast.error((error as any).response.data.message)
      setIsCreatingGuess(false)
    }
  }

  return (
    <div className="w-full rounded-xl border border-gray-300 p-4 gap-4 flex flex-col items-center">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="font-bold text-red-500 text-md text-center sm:text-xl">
          {homeTeam.name} x {awayTeam.name}
        </h1>

        <h2 className="font-bold text-red-500 text-md text-center">
          {group ? `Grupo ${group} - ` : ''} {round}
        </h2>

        <span className="font-bold text-gray-700 ">
          {format(new Date(gameTime), 'HH:mm')}
        </span>
      </div>

      <div
        className={`flex ${
          isBetDisabled ? 'items-end' : 'items-start'
        } justify-between gap-4 sm:gap-6`}
      >
        <TeamCard team={homeTeam} />

        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <BetScore
            isBetDisabled={isBetDisabled}
            score={guess?.homeTeamScore ?? homeTeamScore}
            setScore={handleSetHomeTeamScore}
          />

          <span className="text-red-500 font-bold text-sm md:text-base">X</span>

          <BetScore
            isBetDisabled={isBetDisabled || isAllBetsDisabled}
            score={guess?.awayTeamScore ?? awayTeamScore}
            setScore={handleSetAwayTeamScore}
          />
        </div>

        <TeamCard team={awayTeam} />
      </div>

      {!isBetDisabled && (
        <button
          onClick={handleCreateGuess}
          className="button button-primary w-full mt-5"
          disabled={isCreatingGuess}
        >
          {isCreatingGuess ? (
            <ThreeDots
              height="30"
              width="30"
              radius="9"
              color="#F4F6FF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            'Fazer palpite'
          )}
        </button>
      )}

      {guess && (
        <span className=" font-bold text-center text-sm text-red-500 mt-5">
          Aposta feita em{' '}
          {format(new Date(guess.createdAt), 'dd/MM/y - HH:mm', {
            locale: ptBR,
          })}
        </span>
      )}
    </div>
  )
}
