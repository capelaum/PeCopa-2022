import { Game } from '@/@types/game'
import { GuessesData } from '@/@types/response'
import { api } from '@/services/api'
import { addDays, format, subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useAsync, useAsyncRetry } from 'react-use'
import { BetCard } from '../BetCard'
import { DatePicker } from '../DatePicker'

interface BetsContainerProps {
  isAllBetsDisabled?: boolean
  username: string
}

export function BetsContainer({
  isAllBetsDisabled,
  username,
}: BetsContainerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date(2022, 10, 20))
  const [isGoNextDay, setGoNextDay] = useState(true)
  const [allGames, setAllGames] = useState([] as Game[])
  const [filteredGames, setFilteredGames] = useState([] as Game[])

  // console.log('🚀 ~ allGames', allGames)

  const gamesData = useAsync(async () => {
    const { data }: { data: Game[] } = await api.get(`/games`)

    setAllGames(data)

    return data
  })

  useEffect(() => {
    const filteredGames = allGames.filter((game) =>
      game.gameTime.includes(format(selectedDate, 'yyyy-MM-dd'))
    )

    if (filteredGames.length === 0) {
      if (isGoNextDay && selectedDate < new Date(2022, 12, 18)) {
        setSelectedDate(addDays(selectedDate, 1))
      }

      if (!isGoNextDay && selectedDate > new Date(2022, 10, 20)) {
        setSelectedDate(subDays(selectedDate, 1))
      }
    }

    setFilteredGames(filteredGames)
  }, [selectedDate, allGames])

  const guesses = useAsyncRetry(async () => {
    const { data }: GuessesData = await api.get(`/guesses/${username}`)

    return data
  }, [username])

  function prevDay() {
    const prevDate = subDays(selectedDate, 1)
    setGoNextDay(false)

    setSelectedDate(prevDate)
  }

  function nextDay() {
    const nextDate = addDays(selectedDate, 1)
    setGoNextDay(true)

    setSelectedDate(nextDate)
  }

  const isDataLoading = gamesData.loading || guesses.loading

  const isDataError = gamesData.error || guesses.error

  const isDataLoaded = !gamesData.loading

  return (
    <>
      <DatePicker
        prevDay={prevDay}
        nextDay={nextDay}
        selectedDate={selectedDate}
      />

      <section className="w-full flex flex-col items-center gap-5">
        {isDataLoading && (
          <ThreeDots
            height="50"
            width="50"
            color="#AF053F"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}

        {isDataError && <span>Oops! Algo deu errado...</span>}

        {isDataLoaded &&
          filteredGames?.map((game) => {
            const guess = guesses.value?.find(
              (guess) => guess.gameId === game.id
            )

            return (
              <BetCard
                refetchGuesses={async () => guesses.retry()}
                guess={guess}
                key={game.id}
                game={game}
                isAllBetsDisabled={isAllBetsDisabled}
              />
            )
          })}
      </section>
    </>
  )
}
