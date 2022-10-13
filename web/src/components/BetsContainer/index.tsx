import { MatchesData } from '@/@types/response'
import { api } from '@/services/api'
import { addDays, subDays } from 'date-fns'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useAsync } from 'react-use'
import { BetCard } from '../BetCard'
import { DatePicker } from '../DatePicker'

export function BetsContainer() {
  const [selectedDate, setSelectedDate] = useState(new Date(2022, 10, 20))

  const matches = useAsync(async () => {
    const { data }: MatchesData = await api.get(
      `/matches?matchTime=${new Date(selectedDate).toISOString()}`
    )

    return data
  }, [selectedDate])

  function prevDay() {
    const prevDate = subDays(selectedDate, 1)

    setSelectedDate(prevDate)
  }

  function nextDay() {
    const nextDate = addDays(selectedDate, 1)

    setSelectedDate(nextDate)
  }

  return (
    <>
      <DatePicker
        prevDay={prevDay}
        nextDay={nextDay}
        selectedDate={selectedDate}
      />

      <div className="w-full flex flex-col items-center gap-5">
        {matches.loading && (
          <ThreeDots
            height="30"
            width="30"
            radius="9"
            color="#AF053F"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        )}

        {matches.error && <span>Oops! Algo deu errado...</span>}

        {!matches.error &&
          !matches.loading &&
          matches.value?.map((match) => (
            <BetCard key={match.id} match={match} />
          ))}
      </div>
    </>
  )
}
