import { Match } from '@/@types/match'
import { ThreeDots } from 'react-loader-spinner'
import { AsyncState } from 'react-use/lib/useAsync'
import { BetCard } from '../BetCard'
import { DatePicker } from '../DatePicker'

interface BetsContainerProps {
  matches: AsyncState<Match[]>
  selectedDate: Date
  prevDay: () => void
  nextDay: () => void
}

export function BetsContainer({
  matches,
  selectedDate,
  prevDay,
  nextDay,
}: BetsContainerProps) {
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
