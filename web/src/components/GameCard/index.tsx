import { TeamCard } from '@/components/TeamCard'
import { Auth } from '@/libs/authLib/authTypes'
import { Game } from '@/libs/gamesLib/gameTypes'
import { createGuess } from '@/libs/guessesLib/guessesApi'
import { Guess } from '@/libs/guessesLib/guessTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'react-use'
import { GameScore } from '../GameScore'

interface GameCardProps {
  game: Game
  guess: Guess | null
  isAllBetsDisabled?: boolean
}

export function GameCard({ game, guess, isAllBetsDisabled }: GameCardProps) {
  const [homeTeamScore, setHomeTeamScore] = useState<number | null>(null)
  const [awayTeamScore, setAwayTeamScore] = useState<number | null>(null)
  const [isCreatingGuess, setIsCreatingGuess] = useState(false)

  const { gameTime, homeTeam, awayTeam, group, round } = game

  const isGameDisabled =
    new Date(gameTime) < new Date() ||
    homeTeam.slug === '?' ||
    awayTeam.slug === '?' ||
    isAllBetsDisabled ||
    !!guess

  const [auth] = useLocalStorage(
    import.meta.env.VITE_LOCAL_STORAGE_NAME,
    {} as Auth
  )

  const queryClient = useQueryClient()

  const createGuessMutation = useMutation(createGuess, {
    onSuccess: () => {
      queryClient.invalidateQueries(['games'])
      setIsCreatingGuess(false)
    },
    onError: () => {
      toast.error('Ocorreu um erro ao criar o palpite, tente novamente!')
      setIsCreatingGuess(false)
    },
  })

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
      const newGuessData = await createGuessMutation.mutateAsync({
        userId: auth?.user.id ?? '',
        gameId: game.id,
        homeTeamScore,
        awayTeamScore,
        token: auth?.token ?? '',
      })

      console.log('🚀 ~ newGuessData', newGuessData)

      if (!newGuessData) {
        return
      }

      toast.success(newGuessData.message)
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
          isGameDisabled ? 'items-end' : 'items-start'
        } justify-between gap-4 sm:gap-6`}
      >
        <TeamCard team={homeTeam} />

        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <GameScore
            isGameDisabled={isGameDisabled}
            score={guess?.homeTeamScore ?? homeTeamScore}
            setScore={handleSetHomeTeamScore}
          />

          <span className="text-red-500 font-bold text-sm md:text-base">X</span>

          <GameScore
            isGameDisabled={isGameDisabled || isAllBetsDisabled}
            score={guess?.awayTeamScore ?? awayTeamScore}
            setScore={handleSetAwayTeamScore}
          />
        </div>

        <TeamCard team={awayTeam} />
      </div>

      {!isGameDisabled && (
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
        <span className="font-bold text-center text-sm text-red-500 mt-5">
          Palpite feito em{' '}
          {format(new Date(guess.createdAt), 'dd/MM/y - HH:mm', {
            locale: ptBR,
          })}
        </span>
      )}
    </div>
  )
}
