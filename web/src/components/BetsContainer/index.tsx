import { GuessesData, MatchesData } from '@/@types/response'
import { api } from '@/services/api'
import { addDays, subDays } from 'date-fns'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useAsync, useAsyncRetry } from 'react-use'
import { BetCard } from '../BetCard'
import { DatePicker } from '../DatePicker'

interface BetsContainerProps {
  isAllBetsDisabled?: boolean
  userId: string
}

export function BetsContainer({
  isAllBetsDisabled,
  userId,
}: BetsContainerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date(2022, 10, 20))
  const [isGoNextDay, setGoNextDay] = useState(true)

  const matches = useAsync(async () => {
    const { data }: MatchesData = await api.get(
      `/matches?matchTime=${new Date(selectedDate).toISOString()}`
    )

    if (data.length === 0) {
      if (isGoNextDay) {
        setSelectedDate(addDays(selectedDate, 1))
      }

      if (!isGoNextDay) {
        setSelectedDate(subDays(selectedDate, 1))
      }
    }

    return data
  }, [selectedDate])

  const guesses = useAsyncRetry(async () => {
    const { data }: GuessesData = await api.get(`/guesses?userId=${userId}`)

    return data
  }, [userId])

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

  const isDataLoading = matches.loading || guesses.loading

  const isDataError = matches.error || guesses.error

  const isDataLoaded = !matches.loading

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
          matches.value?.map((match) => {
            const guess = guesses.value?.find(
              (guess) => guess.matchId === match.id
            )

            return (
              <BetCard
                refetchGuesses={async () => guesses.retry()}
                guess={guess}
                key={match.id}
                match={match}
                isAllBetsDisabled={isAllBetsDisabled}
              />
            )
          })}
      </section>
    </>
  )
}
